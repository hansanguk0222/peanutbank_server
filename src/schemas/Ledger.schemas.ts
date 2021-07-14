import mongoose from 'mongoose';

export const LedgerSchema = new mongoose.Schema({
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categorySchema' },
  amount: Number,
});
