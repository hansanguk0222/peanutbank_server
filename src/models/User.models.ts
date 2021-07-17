import { model } from 'mongoose';
import { IUserDocument, IUserModel } from '@/src/types';
import { UserSchema } from '@/src/schemas/User.schemas';

export const UserModel = model<IUserDocument>('user', UserSchema) as IUserModel;
