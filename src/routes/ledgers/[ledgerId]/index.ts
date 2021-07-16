import express from 'express';
import * as ledgerIdIdController from './ledgerId.controller';

const router = express.Router({ mergeParams: true });
router.put('/users/:nickname/years/:yyyy/months/:mm/days/:dd', ledgerIdIdController.updateLedger);
router.delete('/users/:nickname/years/:yyyy/months/:mm/days/:dd', ledgerIdIdController.deleteLedger);
export default router;
