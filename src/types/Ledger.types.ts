import { Document, Model, ObjectId } from 'mongoose';

export interface ILedger extends Document {
  description: string;
  categoryId: string;
  amount: number;
}

export interface ILedgerDocument extends ILedger, Document {}

export interface ILedgerModel extends Model<ILedgerDocument> {}
