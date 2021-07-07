import { model } from 'mongoose';
import { ICategoryDocument } from '@/src/types';
import { CategorySchema } from '@/src/schemas';

export const CategoryModel = model<ICategoryDocument>('category', CategorySchema);
