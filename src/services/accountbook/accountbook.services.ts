import { connect, disconnect } from '@/src/db';
import { IAccountBook } from '@/src/types';
import mongoose from 'mongoose';
import { getThreeYYYYMM, changeAccountbookForm } from '@/src/utils/utilFunc';

export const getAccountbooksService = async ({
  nickname,
  yyyy,
  mm,
}: {
  nickname: string;
  yyyy: string;
  mm: string;
}): Promise<
  {
    [x: string]: {
      expenditure: {};
      income: {};
      allExpenditure: number;
      allIncome: number;
      maxExpenditure: number;
      maxIncome: number;
    };
  }[]
> => {
  const { afterYYYY, afterMM, beforeYYYY, beforeMM } = getThreeYYYYMM({ yyyy: Number(yyyy), mm: Number(mm) });
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  const thisMonthAccountbook = await user.findAccountbookByYYYYMM({ yyyy, mm });
  const beforeMonthAccountbook = await user.findAccountbookByYYYYMM({ yyyy: beforeYYYY, mm: beforeMM });
  const afterMonthAccountbook = await user.findAccountbookByYYYYMM({ yyyy: afterYYYY, mm: afterMM });
  const accountbooks = [beforeMonthAccountbook, thisMonthAccountbook, afterMonthAccountbook].map((accountbook) => {
    if (accountbook !== undefined) {
      return changeAccountbookForm({ accountbook });
    } else {
      return {};
    }
  });
  return accountbooks;
};
