import { Document } from 'mongoose';
import { ICategoryDocument } from '@/src/types';

export async function updateCategoryColor(this: ICategoryDocument, color: string): Promise<void> {
  this.color = color;
  return;
}

export async function deleteCategory(this: ICategoryDocument): Promise<void> {
  this.isExist = false;
  return;
}
