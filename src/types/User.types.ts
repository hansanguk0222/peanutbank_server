import { Document, Model, ObjectId } from 'mongoose';
import { IAccountBook } from './Accountbook.types';
import { ICategory, ICategoryDocument } from './Category.types';
import mongoose from 'mongoose';
import { ILedgerDocument } from './Ledger.types';

export interface IUser {
  userId: string;
  OAuthType: string;
  nickname: string;
  image: string;
  accountbooks: IAccountBook[];
  categories: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  updateImage: (this: IUserDocument, userId: string, image: string) => Promise<string>;
  updateNickname: (this: IUserDocument, { nickname }: { nickname: string }) => Promise<void>;
  updateCategoryColor: (this: IUserDocument, { categoryId, color }: { categoryId: string; color: string }) => Promise<void>;
  deleteCategory: (this: IUserDocument, { categoryId }: { categoryId: string }) => Promise<void>;
  findAccountbookByYYYYMM: (this: IUserDocument, { yyyy, mm }: { yyyy: string; mm: string }) => Promise<IAccountBook>;
  createLedger: (
    this: IUserDocument,
    {
      yyyy,
      mm,
      dd,
      incomeOrExpenditure,
      description,
      amount,
      categoryId,
    }: { yyyy: string; mm: string; dd: string; incomeOrExpenditure: string; description: string; amount: number; categoryId: string }
  ) => Promise<mongoose.Types.ObjectId>;
  updateLedger(
    this: IUserDocument,
    {
      yyyy,
      mm,
      dd,
      incomeOrExpenditure,
      description,
      amount,
      categoryId,
      ledgerId,
    }: { yyyy: string; mm: string; dd: string; incomeOrExpenditure: string; description: string; amount: number; categoryId: string; ledgerId: string }
  ): Promise<mongoose.Types.ObjectId>;
  createCategory: (this: IUserDocument, { name, color }: { name: string; color: string }) => Promise<mongoose.Types.ObjectId>;
  findLedgersByYYYYMMDD: (this: IUserDocument, { yyyy, mm, dd }: { yyyy: string; mm: string; dd: string }) => Promise<ILedgerDocument[]>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByUserIdOrCreateUser: (this: IUserModel, userId: string, OAuthType: string) => Promise<IUserDocument>;
  findCategoriesByNickname: (this: IUserModel, nickname: string) => Promise<ICategoryDocument[]>;
  findUserByNickname: (this: IUserModel, { nickname }: { nickname: string }) => Promise<IUserDocument>;
  findCategoryByNicknameAndCategoryId: (this: IUserModel, nickname: string, categoryId: string) => Promise<IUserDocument>;
}
