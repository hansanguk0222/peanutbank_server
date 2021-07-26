import { verifyRequestData } from '@/src/utils/utilFunc';
import { Request, Response, NextFunction } from 'express';
import { findUserByUserIdService } from '@/src/services';
import { TIME } from '@/src/utils/constants';

export const googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { googleId } = req.body;
  if (verifyRequestData([googleId])) {
    try {
      const { accessToken, image, nickname, oauthType, refreshToken } = await findUserByUserIdService({ userId: googleId, oauthType: 'google' });
      const userInfo = { nickname, image, oauthType };
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: TIME.FIVE_MINUTE * 1000,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: TIME.TWO_MONTH * 1000,
      });
      res.cookie('nickname', nickname, {
        httpOnly: true,
        maxAge: TIME.TWO_MONTH * 1000,
      });
      res.status(200).json({ userInfo });
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  res.status(401).end();
  return;
};
