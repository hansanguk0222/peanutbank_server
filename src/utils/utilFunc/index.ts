import { COLORSTRINGARRAY, NICKNAMESTRINGARRAY } from '../constants';
import { IAccountBook, ILedger } from '@/src/types';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { TIME } from '@/src/utils/constants';
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);

export const isGoogleIdTokenVerify = async ({ token }) => {
  try {
    await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_LOGIN_CLIENT_ID,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createUserInfoToken = ({ nickname, image, oauthType }: { nickname: string; image: string; oauthType: string }): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign({ nickname, image, oauthType }, process.env.ACCESS_TOKEN_KEY, { expiresIn: TIME.FIVE_MINUTE });
  const refreshToken = jwt.sign({ nickname, image, oauthType }, process.env.REFRESH_TOKEN_KEY, { expiresIn: TIME.TWO_MONTH });
  return { accessToken, refreshToken };
};

export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((e) => {
    return e !== undefined && e !== null;
  });

export const createRandomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += COLORSTRINGARRAY[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const createRandomNickname = () => {
  let nickname = '';
  for (let i = 0; i < 10; i++) {
    nickname += NICKNAMESTRINGARRAY[Math.floor(Math.random() * 62)];
  }
  return nickname;
};

export const getThreeYYYYMM = ({ yyyy, mm }: { yyyy: number; mm: number }) => {
  let beforeYYYY, beforeMM;
  let afterYYYY, afterMM;

  if (mm === 12) {
    afterYYYY = yyyy + 1;
    afterMM = 1;
  } else {
    afterYYYY = yyyy;
    afterMM = mm + 1;
  }

  if (mm === 1) {
    beforeYYYY = yyyy - 1;
    beforeMM = 12;
  } else {
    beforeYYYY = yyyy;
    beforeMM = mm - 1;
  }

  return { beforeYYYY, beforeMM, afterYYYY, afterMM };
};

export const changeDailyLedgersForm = ({
  ledgers,
}: {
  ledgers: {
    dd: string;
    ddValue: ILedger[];
  }[];
}) => {
  const newForm = {};
  ledgers.map((ledger) => {
    newForm[ledger.dd] = ledger.ddValue;
  });
  return newForm;
};

export const changeAccountbookForm = ({ accountbook }: { accountbook: IAccountBook }) => {
  const { yyyymm, yyyymmValue } = accountbook;
  const { income, expenditure, allExpenditure, allIncome, maxExpenditure, maxIncome } = yyyymmValue;
  const expenditureNewForm = changeDailyLedgersForm({ ledgers: expenditure });
  const incomeNewForm = changeDailyLedgersForm({ ledgers: income });
  return {
    [yyyymm]: {
      expenditure: expenditureNewForm,
      income: incomeNewForm,
      allExpenditure,
      allIncome,
      maxExpenditure,
      maxIncome,
    },
  };
};

export const getNewMaxAmount = ({ ddValue }: { ddValue: { _id?: mongoose.Types.ObjectId; amount: number; description: string; categoryId: string }[] }): number => {
  const newMaxAmount = ddValue.reduce((acc: number, cur: { _id?: mongoose.Types.ObjectId; amount: number; description: string; categoryId: string }) => {
    return acc + cur.amount;
  }, 0);
  return newMaxAmount;
};
