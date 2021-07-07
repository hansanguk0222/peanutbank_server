import { model } from 'mongoose';
import { IUserDocument } from '@/src/types';
import { UserSchema } from '@/src/schemas';

export const UserModel = model<IUserDocument>('user', UserSchema);
