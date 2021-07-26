import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { isGoogleIdTokenVerify } from '@/src/utils/utilFunc';

export const oauthTokenCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const check = await isGoogleIdTokenVerify({ token });
  if (check) {
    next();
    return;
  }
  res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
  return;
};
