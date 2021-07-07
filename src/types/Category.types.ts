import { Document, Model } from 'mongoose';

export interface ICategory {
  name: string;
  color: string;
  isExist: boolean;
}

export interface ICategoryDocument extends ICategory, Document {
  updateCategoryColor: (this: ICategoryDocument, color: string) => Promise<void>;
  deleteCategory: (this: ICategoryDocument) => Promise<void>;
}

export interface ICategoryModel extends Model<ICategoryDocument> {
  findOneByNameOrCreateCategory: (this: ICategoryModel, name: string) => Promise<ICategoryDocument>;
  findByIdCategory: (this: ICategoryModel, _id: string) => Promise<ICategoryDocument>;
}
