import mongoose from 'mongoose';
import { LedgerSchema } from './Ledger.schemas';

export const AccountbookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  yyyymm: { type: String, required: true, unique: true },
  yyyymmValue: {
    expenditure: {
      dd: { type: String, requied: true, uqique: true },
      ddValue: [LedgerSchema],
    },
    income: {
      dd: { type: String, requied: true, uqique: true },
      ddValue: [LedgerSchema],
    },
    allExpenditure: Number,
    allIncome: Number,
    maxExpenditure: Number,
    maxIncome: Number,
  },
});
