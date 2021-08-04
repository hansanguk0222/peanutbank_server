import mongoose from 'mongoose';
import { AccountbookSchema } from './Accountbook.schemas';
import { CategorySchema } from './Category.schemas';
import { findCategoriesByNickname, findUserByNickname, findCategoryByNicknameAndCategoryId, findAccoutbookByNickname, findUserByUserIdOrCreateUser } from '@/src/statics';
import {
  updateImage,
  updateNickname,
  updateCategoryColor,
  deleteCategory,
  findAccountbookByYYYYMM,
  createLedger,
  updateLedger,
  createCategory,
  findLedgersByYYYYMMDD,
  deleteLedger,
} from '@/src/methods';

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  oauthType: { type: String, required: true },
  nickname: { type: String, unique: true },
  image: String,
  accountbooks: [AccountbookSchema],
  categories: [CategorySchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.statics.findUserByNickname = findUserByNickname;
UserSchema.statics.findCategoriesByNickname = findCategoriesByNickname;
UserSchema.statics.findCategoryByNicknameAndCategoryId = findCategoryByNicknameAndCategoryId;
UserSchema.statics.findAccountbookNickname = findAccoutbookByNickname;
UserSchema.statics.findUserByUserIdOrCreateUser = findUserByUserIdOrCreateUser;

UserSchema.methods.updateImage = updateImage;
UserSchema.methods.updateNickname = updateNickname;
UserSchema.methods.updateCategoryColor = updateCategoryColor;
UserSchema.methods.deleteCategory = deleteCategory;
UserSchema.methods.findAccountbookByYYYYMM = findAccountbookByYYYYMM;
UserSchema.methods.createLedger = createLedger;
UserSchema.methods.updateLedger = updateLedger;
UserSchema.methods.createCategory = createCategory;
UserSchema.methods.findLedgersByYYYYMMDD = findLedgersByYYYYMMDD;
UserSchema.methods.deleteLedger = deleteLedger;

export { UserSchema };
