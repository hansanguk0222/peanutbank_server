import express from 'express';
import categoryRouter from './categories';
import accountbookRouter from './accountbooks';
import ledgerRouter from './ledgers';
const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/accountbooks', accountbookRouter);
router.use('/ledgers', ledgerRouter);
export default router;
