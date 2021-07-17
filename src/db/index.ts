import mongoose from 'mongoose';
import { AccountbookModel, CategoryModel, LedgerModel, UserModel } from '@/src/models';

export const connect = () => {
  const uri = `${process.env.MONGO_URL}`;

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('DB 접속 성공');
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    AccountbookModel,
    CategoryModel,
    LedgerModel,
    UserModel,
  };
};

export const disconnect = () => {
  mongoose.disconnect();
  console.log('DB 접속 종료');
};
