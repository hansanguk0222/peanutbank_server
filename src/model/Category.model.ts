import { model } from "mongoose";
import { ICategoryDocument } from "@/src/type";
import { CategorySchema } from "@/src/schema";

export const CategoryModel = model<ICategoryDocument>(
  "category",
  CategorySchema
);
