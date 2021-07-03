import { model } from "mongoose";
import { IUserDocument } from "@/src/type";
import { UserSchema } from "@/src/schema";

export const UserModel = model<IUserDocument>("user", UserSchema);
