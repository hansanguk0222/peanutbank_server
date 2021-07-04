import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  color: String,
});
