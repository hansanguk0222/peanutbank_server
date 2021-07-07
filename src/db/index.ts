import mongoose from 'mongoose';

export const connect = () => {
  console.log(process.env.MONGO_URL);
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
};

export const disconnect = () => {
  mongoose.disconnect();
  console.log('DB 접속 종료');
};
