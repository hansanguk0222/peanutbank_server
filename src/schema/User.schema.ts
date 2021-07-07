import mongoose from 'mongoose';
import { AccountbookSchema } from './Accountbook.schema';
import { CategorySchema } from './Category.schema';
import { findByUserIdOrCreateUser } from '@/src/static';
import { updateImage } from '@/src/method';

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
