import { Document, Model } from 'mongoose';
import { ILedger } from './Ledger.types';
export interface IAccountBook {
  yyyymm: string;
  yyyymmValue: {
    expenditure: {
      dd: string;
      ddValue: [ILedger];
    };
    income: {
      dd: string;
      ddValue: [ILedger];
    };
    allExpenditure: number;
    allIncome: number;
    maxExpenditure: number;
    maxIncome: number;
  };
}

export interface IAccountbookDocument extends IAccountBook, Document {}

export interface IAccountbookModel extends Model<IAccountbookDocument> {}
