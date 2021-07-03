import { Document, Model } from "mongoose";

export interface ICategory {
  name: string;
  color: string;
}

export interface ICategoryDocument extends ICategory, Document {}

export interface ICategoryModel extends Model<ICategoryDocument> {}
