import { ICategoryDocument, ICategory, IUserDocument, IUserModel } from '@/src/types';
import mongoose, { Document } from 'mongoose';
import { CategoryModel } from '../models';
import { createRandomNickname } from '@/src/utils/utilFunc';
import { CATEGORIES } from '@/src/utils/constants';

export async function findUserByNickname(this: IUserModel, { nickname }: { nickname: string }): Promise<IUserDocument> {
  const user = await this.findOne({ nickname });
  return user;
}

export async function findCategoriesByNickname(this: IUserModel, nickname: string): Promise<ICategoryDocument[]> {
  const categories = await this.findOne({ nickname }).then((user) => user.categories);
  const categoriesDocument: ICategoryDocument[] = [];
  categories.map((category) => categoriesDocument.push(new CategoryModel(category)));
  return categoriesDocument;
}

export async function findCategoryByNicknameAndCategoryId(this: IUserModel, nickname: string, categoryId: string): Promise<IUserDocument> {
  const [user] = (await this.aggregate([
    { $match: { nickname } },
    { $unwind: '$categories' },
    {
      $match: { 'categories._id': mongoose.Types.ObjectId(categoryId) },
    },
    {
      $project: {
        _id: 0,
        categories: 1,
      },
    },
  ])) as [IUserDocument];
  return user;
}

export async function findAccoutbookByNickname(this: IUserModel, { nickname }: { nickname: string }): Promise<IUserDocument> {
  const [user] = (await this.aggregate([
    { $match: { nickname } },
    { $unwind: '$accountbooks' },
    {
      $project: {
        _id: 0,
        accountbooks: 1,
      },
    },
  ])) as [IUserDocument];
  return user;
}

export async function findUserByUserIdOrCreateUser(this: IUserModel, { userId, oauthType }: { userId: string; oauthType: string }): Promise<IUserDocument> {
  const nickname = createRandomNickname();
  const user = await this.findOneAndUpdate(
    { userId },
    {
      $setOnInsert: {
        userId,
        oauthType,
        nickname,
        image: '임시로 넣는다.',
        accountbooks: [],
        categories: CATEGORIES,
      },
    },
    { upsert: true, new: true }
  );
  return user;
}
