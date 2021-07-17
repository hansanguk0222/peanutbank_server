import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/src/utils/utilFunc';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { getAccountbooksService } from '@/src/services';
import { createRandomColor } from '@/src/utils/utilFunc';

export const getAccountbooks = async (req: Request, res: Response, next: NextFunction) => {
  const { nickname, yyyy, mm } = req.params;
  if (verifyRequestData([nickname, yyyy, mm])) {
    try {
      const accountbooks = await getAccountbooksService({ nickname, yyyy, mm });
      res.status(200).json({ accountbooks });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
