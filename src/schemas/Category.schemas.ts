import mongoose from 'mongoose';
import { findByIdCategory, findOneByNameOrCreateCategory } from '@/src/statics';
import { deleteCategory, updateCategoryColor } from '@/src/methods';

const CategorySchema = new mongoose.Schema({
  name: { type: String, index: true },
  color: String,
  isExist: Boolean,
});

CategorySchema.statics.findByIdCategory = findByIdCategory;
CategorySchema.statics.findOneByNameOrCreateCategory = findOneByNameOrCreateCategory;

CategorySchema.methods.updateCategoryColor = updateCategoryColor;
CategorySchema.methods.deleteCategory = deleteCategory;

export { CategorySchema };
