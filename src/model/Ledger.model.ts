import { model } from "mongoose";
import { ILedger } from "@/src/type";
import { LedgerSchema } from "@/src/schema";

export const LedgerModel = model<ILedger>("ledger", LedgerSchema);
