import mongoose from 'mongoose';
import { AccountbookSchema } from './Accountbook.schemas';
import { CategorySchema } from './Category.schemas';
import { findByUserIdOrCreateUser } from '@/src/statics';
import { updateImage } from '@/src/methods';

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

UserSchema.methods.updateImage = updateImage;

export { UserSchema };
