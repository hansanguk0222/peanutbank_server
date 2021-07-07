import { model } from 'mongoose';
import { IAccountbookDocument } from '@/src/types';
import { AccountbookSchema } from '@/src/schemas';

export const AccountbookModel = model<IAccountbookDocument>('accountbook', AccountbookSchema);
