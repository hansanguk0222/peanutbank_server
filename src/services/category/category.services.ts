import { connect, disconnect } from '@/src/db';
import { ICategory, ICategoryDocument } from '@/src/types';
import mongoose from 'mongoose';

export const getCategoriesService = async ({ nickname }: { nickname: string }): Promise<ICategoryDocument[]> => {
  const db = connect();
  const categories = await db.UserModel.findCategoriesByNickname(nickname);
  disconnect();
  return categories;
};

export const createCategoryService = async ({ nickname, name, color }: { nickname: string; name: string; color: string }): Promise<mongoose.Types.ObjectId | boolean> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  const categoryId = await user.createCategory({ name, color });
  disconnect();
  console.log(categoryId);
  return categoryId;
};

export const updateCategoryColorService = async ({ nickname, categoryId, color }: { nickname: string; categoryId: string; color: string }): Promise<void> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  await user.updateCategoryColor({ categoryId, color });
  disconnect();
};

export const deleteCategoryService = async ({ nickname, categoryId }: { nickname: string; categoryId: string }): Promise<void> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  await user.deleteCategory({ categoryId });
  disconnect();
};
