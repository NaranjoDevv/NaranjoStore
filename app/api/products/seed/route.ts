import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  const { users, products } = data;

  await dbConnect();
  await UserModel.deleteMany();
  await UserModel.insertMany(users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);

  return NextResponse.json({
    message: "Seeded Succsesfully",
    users,
    products,
  });
};
