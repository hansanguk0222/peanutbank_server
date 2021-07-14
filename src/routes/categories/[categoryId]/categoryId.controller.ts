import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/src/utils/utilFunc';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { updateCategoryColorService, deleteCategoryService } from '@/src/services';

export const updateCategoryColor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { categoryId, nickname } = req.params;
  const { color } = req.body;
  if (verifyRequestData([categoryId, nickname, color])) {
    try {
      await updateCategoryColorService({ nickname, categoryId, color });
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { categoryId, nickname } = req.params;
  if (verifyRequestData([categoryId, nickname])) {
    try {
      await deleteCategoryService({ nickname, categoryId });
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
