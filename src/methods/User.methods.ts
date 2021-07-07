import { Document } from 'mongoose';
import { IUserDocument } from '@/src/types';

export async function updateImage(this: IUserDocument, userId: string, image: string): Promise<string> {
  const filter = { userId };
  const updatedDoc = {
    $set: {
      image,
      updatedAt: new Date(),
    },
  };
  try {
    const result = await this.model('user').updateOne(filter, updatedDoc);
    return 'ok'; //추후 수정
  } catch (err) {
    return err; //추후 수정
  }
}
