import { model } from 'mongoose';
import { ILedger } from '@/src/types';
import { LedgerSchema } from '@/src/schemas';

export const LedgerModel = model<ILedger>('ledger', LedgerSchema);
