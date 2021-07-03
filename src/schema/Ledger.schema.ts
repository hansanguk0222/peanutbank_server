import mongoose from "mongoose";

export const LedgerSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  discription: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categorySchema" },
  amount: Number,
});
