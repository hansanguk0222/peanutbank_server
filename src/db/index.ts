import mongoose from "mongoose";
import { UserSchema } from "@/src/schema";

UserSchema.set("collection", "peanutbank");

export const peanutbankModel = mongoose.model("User", UserSchema);

const database = mongoose.Connection;

export const connect = () => {
  if (database) {
    console.log("DB에 이미 연결된 상태");
    return;
  }

  const uri = `${process.env.MONGO_URL}`;

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("DB 접속 성공");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const disconnect = () => {
  if (!database) {
    console.log("DB와 이미 끊어진 상태");
    return;
  }

  mongoose.disconnect();
  console.log("DB 접속 종료");
};
