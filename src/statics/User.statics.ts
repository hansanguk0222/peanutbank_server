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

export async function findCategoriesByNickname(this: IUserModel, nickname: string): Promise<[ICategory]> {
  const categories = await this.findOne({ nickname }).then((user) => user.categories);
  return categories;
}

export async function createCategory(this: IUserModel, { nickname, name, color }: { nickname: string; name: string; color: string }): Promise<mongoose.Types.ObjectId> {
  const _id = mongoose.Types.ObjectId();
  await this.updateOne({ nickname }, { $push: { categories: { _id, name, color, isExist: true } } });
  return _id;
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

export async function createLedger(
  this: IUserModel,
  {
    nickname,
    yyyy,
    mm,
    dd,
    incomeOrExpenditure,
    description,
    amount,
    categoryId,
  }: { nickname: string; yyyy: string; mm: string; dd: string; incomeOrExpenditure: string; description: string; amount: number; categoryId: string }
): Promise<mongoose.Types.ObjectId> {
  const _id = mongoose.Types.ObjectId();
  const whichTypeDD = incomeOrExpenditure === 'income' ? 'accountbooks.income.dd' : 'accountbooks.expenditure.dd';
  const accountbook = await this.findOneAndUpdate({ nickname, yyyymm: `${yyyy}-${mm}` }, { yyyymm: { expenditure: {}, income: {}, allIncome: 0, maxIncome: 0, allExpenditure: 0, maxExpenditure: 0 } });
  await this.findOneAndUpdate({ nickname, yyyymm: `${yyyy}-${mm}`, [whichTypeDD]: dd }, { dd, ddValue: [] });
  await this.updateOne({ nickname, yyyymm: `${yyyy}-${mm}`, [whichTypeDD]: dd }, { $push: { ddValue: { _id, description, amount, categoryId, isExist: true } } });
  //최대최소 수입지출, 총 수입지출 변경하는 코드 들어가야 함, aggregate를 써보자
  return _id;
}
