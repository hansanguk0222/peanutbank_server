import { connect, disconnect } from '@/src/db';
import { ILedger } from '@/src/types';
import mongoose from 'mongoose';
import { createRandomColor } from '@/src/utils/utilFunc';

export const getLedgersService = async ({ nickname, yyyy, mm, dd }: { nickname: string; yyyy: string; mm: string; dd: string }): Promise<ILedger[]> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  const ledgers = await user.findLedgersByYYYYMMDD({ yyyy, mm, dd });
  return ledgers;
};

export const createLedgerService = async ({
  nickname,
  yyyy,
  mm,
  dd,
  incomeOrExpenditure,
  description,
  amount,
  category,
}: {
  nickname: string;
  yyyy: string;
  mm: string;
  dd: string;
  incomeOrExpenditure: string;
  description: string;
  amount: number;
  category: string;
}): Promise<string> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  const color = createRandomColor();
  const categoryId = await user.createCategory({ color, name: category });
  const _id = await user.createLedger({ amount, categoryId: categoryId.toHexString(), dd, description, incomeOrExpenditure, mm, yyyy });
  return _id.toHexString();
};

export const updateLedgerService = async ({
  nickname,
  yyyy,
  mm,
  dd,
  incomeOrExpenditure,
  description,
  amount,
  category,
  ledgerId,
}: {
  nickname: string;
  yyyy: string;
  mm: string;
  dd: string;
  incomeOrExpenditure: string;
  description: string;
  amount: number;
  category: string;
  ledgerId: string;
}): Promise<void> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  const color = createRandomColor();
  const categoryId = await user.createCategory({ color, name: category });
  await user.updateLedger({ amount, categoryId: categoryId.toHexString(), dd, description, incomeOrExpenditure, ledgerId, mm, yyyy });
};

export const deleteLedgerService = async ({ nickname, ledgerId, yyyy, mm, dd }: { nickname: string; ledgerId: string; yyyy: string; mm: string; dd: string }): Promise<void> => {
  const db = connect();
  const user = await db.UserModel.findUserByNickname({ nickname });
  await user.deleteLedger({ dd, ledgerId, mm, yyyy });
};
