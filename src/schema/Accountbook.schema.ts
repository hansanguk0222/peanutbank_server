import mongoose from "mongoose";
import { LedgerSchema } from "./Ledger.schema";

export const AccountbookSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
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
