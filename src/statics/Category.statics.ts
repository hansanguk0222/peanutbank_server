import { ICategoryModel, ICategoryDocument } from '@/src/types/Category.types';

export async function findOneByNameOrCreateCategory(this: ICategoryModel, name: string): Promise<ICategoryDocument> {
  const category = await this.findOne({ name });
  if (category) {
    return category;
  } else {
    return this.create({ name, color: '' });
  }
}

export async function findByIdCategory(this: ICategoryModel, _id: string): Promise<ICategoryDocument> {
  const category = await this.findOne({ _id });
  return category;
}
