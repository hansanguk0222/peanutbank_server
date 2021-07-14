import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/src/utils/utilFunc';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { getCategoriesService, createCategoryService } from '@/src/services';
import { createRandomColor } from '@/src/utils/utilFunc';

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nickname } = req.params;
  if (verifyRequestData([nickname])) {
    try {
      const categories = await getCategoriesService({ nickname });
      res.status(200).json({ categories });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nickname, name } = req.body;
  if (verifyRequestData([nickname, name])) {
    try {
      const color = createRandomColor();
      const categoryId = await createCategoryService({ nickname, name, color });
      res.status(201).json({ categoryId });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
