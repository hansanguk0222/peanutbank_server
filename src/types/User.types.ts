import { Document, Model, ObjectId } from 'mongoose';
import { IAccountBook } from './Accountbook.types';
import { ICategory } from './Category.types';

export interface IUser {
  userId: string;
  OAuthType: string;
  nickname: string;
  image: string;
  accountBook: [IAccountBook];
  categories: [ICategory];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  updateImage: (this: IUserDocument, userId: string, image: string) => Promise<string>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByUserIdOrCreateUser: (this: IUserModel, userId: string, OAuthType: string) => Promise<IUserDocument>;
  findCategoriesByUserId: (this: IUserModel, userId: string, OAuthType: string) => Promise<[ICategory]>;
}
