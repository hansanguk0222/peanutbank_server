import { Document, Model, ObjectId } from "mongoose";

export interface ILedger {
  discription: string;
  categoryId: ObjectId;
  account: number;
}

export interface ILedgerDocument extends ILedger, Document {}

export interface ILedgerModel extends Model<ILedgerDocument> {}
