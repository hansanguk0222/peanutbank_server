import { Document, Model, ObjectId } from "mongoose";
import { IAccountBook } from "./Accountbook.type";
import { ICategory } from "./Category.type";

export interface IUser {
  userId: string;
  OAuthType: string;
  nickname: string;
  image: string;
  accountBook: [IAccountBook];
  categoris: [ICategory];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
