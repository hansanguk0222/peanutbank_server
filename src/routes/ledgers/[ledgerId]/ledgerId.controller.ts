import { Request, Response, NextFunction } from 'express';
import { verifyRequestData } from '@/src/utils/utilFunc';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { updateLedgerService, deleteLedgerService } from '@/src/services';

export const updateLedger = async (req: Request, res: Response, next: NextFunction) => {
  const { ledgerId, nickname, yyyy, mm, dd } = req.params;
  const { category, description, amount, incomeOrExpenditure } = req.body;
  if (verifyRequestData([ledgerId, nickname, yyyy, mm, dd, category, description, amount])) {
    try {
      await updateLedgerService({ amount, category, dd, description, incomeOrExpenditure, ledgerId, mm, nickname, yyyy });
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};

export const deleteLedger = async (req: Request, res: Response, next: NextFunction) => {
  const { ledgerId, nickname, yyyy, mm, dd } = req.params;
  if (verifyRequestData([nickname, ledgerId, yyyy, mm, dd])) {
    try {
      await deleteLedgerService({ dd, ledgerId, mm, nickname, yyyy });
      res.status(200).end();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(400).json({ message: ERROR_MESSAGE.MISSING_REQUIRED_VALUES });
};
