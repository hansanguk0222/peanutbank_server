import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGE } from '@/src/utils/constants';
import { isVerifiedToken } from '@/src/utils/utilFunc';

export const accessTokenCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.headers.authorization.split('Bearer ')[1];
    console.log('토큰 검증 결과: ', accessToken);
    await isVerifiedToken({ token: accessToken, type: 'accessToken' });
    next();
    return;
  } catch (err) {
    res.status(401).json({ message: ERROR_MESSAGE.INVALID_TOKEN });
  }
};
