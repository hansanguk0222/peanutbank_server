import { ICategoryModel, ICategoryDocument } from '@/src/types/Category.types';

export async function findOneByNameOrCreate(this: ICategoryModel, name: string): Promise<ICategoryDocument> {
  const category = await this.findOne({ name });
  if (category) {
    return category;
  } else {
    return this.create({ name, color: '' });
  }
}
