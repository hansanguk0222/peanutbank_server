import { connect, disconnect } from '@/src/db';
import { createUserInfoToken } from '@/src/utils/utilFunc';
import redisClient from '@/src/redis';

export const findUserByUserIdService = async ({
  userId,
  oauthType,
}: {
  userId: string;
  oauthType: string;
}): Promise<{ nickname: string; image: string; oauthType: string; accessToken: string; refreshToken: string }> => {
  const db = connect();
  const { UserModel } = db;
  const user = await UserModel.findUserByUserIdOrCreateUser({ userId, oauthType });
  disconnect();
  const { nickname, image } = user;
  const { accessToken, refreshToken } = createUserInfoToken({ image, nickname, oauthType });
  redisClient.set(nickname, refreshToken);
  return { nickname, image, oauthType, accessToken, refreshToken };
};
