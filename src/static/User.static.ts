import { IUserDocument, IUserModel } from "@/src/type";

export async function findByUserIdOrCreateUser(
  this: IUserModel,
  userId: string,
  OAuthType: string
): Promise<IUserDocument> {
  const user = await this.findOne({ userId, OAuthType });
  if (user) {
    return user;
  } else {
    //userId는 OAuth에서 발급한 내용
    //OAutyType은 인증한 기관
    //nickname은 랜덤으로 삽입
    //image는 기본 이미지
    //categories는 기본으로 생성되는 category들
    this.create({ userId, OAuthType });
  }
}
