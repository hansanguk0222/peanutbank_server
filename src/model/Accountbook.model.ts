import { model } from "mongoose";
import { IAccountbookDocument } from "@/src/type";
import { AccountbookSchema } from "@/src/schema";

export const AccountbookModel = model<IAccountbookDocument>(
  "accountbook",
  AccountbookSchema
);
