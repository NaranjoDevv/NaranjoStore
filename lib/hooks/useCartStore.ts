import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem } from "../models/OrderModel";
import { persist } from "zustand/middleware";


type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export const cartStore = create<Cart> ()(
  persist(() =>initialState , {
    name: "cart-storage",
  })
)

export default function useCartService() {
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);

      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
     if(!exist) return

     const updatedCartItems = exist.qty === 1
       ? items.filter((x: OrderItem) => x.slug !== item.slug)
      : items.map((x) =>
          x.slug === item.slug ? {...exist, qty: exist.qty - 1 } : x
        );

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);

      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    remove: (item: OrderItem) => {
      const updatedCartItems = items.filter((x: OrderItem) => x.slug !== item.slug);
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);

      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
  };
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = 
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ,
    shippingPrice = itemsPrice > 100 ? 0 : 100,
    taxPrice = Number(0.15 * itemsPrice),
    totalPrice = itemsPrice + shippingPrice + taxPrice;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
