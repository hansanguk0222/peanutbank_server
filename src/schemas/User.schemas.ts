import mongoose from 'mongoose';
import { AccountbookSchema } from './Accountbook.schemas';
import { CategorySchema } from './Category.schemas';
import { findByUserIdOrCreateUser, findCategoriesByUserId } from '@/src/statics';
import { updateImage } from '@/src/methods';

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  OAuthType: { type: String, required: true },
  nickname: String,
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

UserSchema.statics.findByUserIdOrCreateUser = findByUserIdOrCreateUser;
UserSchema.statics.findCategoriesByUserId = findCategoriesByUserId;

UserSchema.methods.updateImage = updateImage;

export { UserSchema };
