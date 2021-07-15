import express from 'express';
import * as ledgersController from './ledgers.controller';

const router = express.Router({ mergeParams: true });

router.post('/', ledgersController.createLedger);
router.get('/users/:nickname/years/:yyyy/months/:mm/days/:dd', ledgersController.getLedgers);

export default router;
