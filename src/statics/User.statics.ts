import { ICategoryDocument, ICategory, IUserDocument, IUserModel } from '@/src/types';
import mongoose from 'mongoose';

export async function findByUserIdOrCreateUser(this: IUserModel, userId: string, OAuthType: string): Promise<IUserDocument> {
  const user = await this.findOne({ userId });
  if (user) {
    return user;
  } else {
    //userId는 OAuth에서 발급한 내용
    //OAutyType은 인증한 기관
    //nickname은 랜덤으로 삽입
    //image는 기본 이미지
    //categories는 기본으로 생성되는 category들
    this.create({ userId, OAuthType });
  }
}

export async function findUserByNickname(this: IUserModel, { nickname }: { nickname: string }): Promise<IUserDocument> {
  const user = await this.findOne({ nickname });
  return user;
}

export async function findCategoriesByNickname(this: IUserModel, nickname: string): Promise<ICategory[]> {
  const categories = await this.findOne({ nickname }).then((user) => user.categories);
  return categories;
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
