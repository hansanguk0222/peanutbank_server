import { connect, disconnect } from '@/src/db';
import { createUserInfoToken } from '@/src/utils/utilFunc';
import redisClient from '@/src/redis';

export const findUserByUserIdService = async ({ userId, oauthType }: { userId: string; oauthType: string }): Promise<{ nickname: string; image: string; oauthType: string; accessToken: string }> => {
  const db = connect();
  const { UserModel } = db;
  const user = await UserModel.findUserByUserIdOrCreateUser({ userId, oauthType });
  disconnect();
  console.log(user);
  const { nickname, image } = user;
  const { accessToken, refreshToken } = createUserInfoToken({ image, nickname, oauthType });
  console.log(nickname, image, oauthType, accessToken, refreshToken);
  redisClient.set(nickname, refreshToken);
  return { nickname, image, oauthType, accessToken };
};
