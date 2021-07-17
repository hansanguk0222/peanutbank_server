import express from 'express';
import * as ledgersController from './ledgers.controller';
import ledgerIdController from './[ledgerId]';

const router = express.Router({ mergeParams: true });

router.post('/', ledgersController.createLedger);
router.get('/users/:nickname/years/:yyyy/months/:mm/days/:dd', ledgersController.getLedgers);
router.use('/:ledgerId', ledgerIdController);
export default router;
