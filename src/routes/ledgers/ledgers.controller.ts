import { verifyRequestData } from '@/src/utils/utilFunc';
import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { createLedgerService, getLedgersService } from '@/src/services';

export const createLedger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nickname, amount, category, dd, description, incomeOrExpenditure, mm, yyyy } = req.body;
  if (verifyRequestData([nickname, amount, category, dd, description, incomeOrExpenditure, mm, yyyy])) {
    try {
      const id = await createLedgerService({ nickname, amount: +amount, category, dd, description, incomeOrExpenditure, mm, yyyy });
      res.status(201).json({ id });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const getLedgers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nickname, yyyy, mm, dd } = req.params;
  if (verifyRequestData([nickname, yyyy, mm, dd])) {
    try {
      const ledgers = await getLedgersService({ nickname, yyyy, mm, dd });
      res.status(200).json({ ledgers });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
