import { STRINGARRAY } from '../constants';
import { IAccountBook, ILedger } from '@/src/types';
import mongoose from 'mongoose';

export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((e) => {
    return e !== undefined && e !== null;
  });

export const createRandomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += STRINGARRAY[Math.floor(Math.random() * 16)];
  }
  return color;
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
