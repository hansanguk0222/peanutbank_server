import express from 'express';
import categoryRouter from './categories';
import accountbookRouter from './accountbooks';
import ledgerRouter from './ledgers';
import userRouter from './user';
const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/accountbooks', accountbookRouter);
router.use('/ledgers', ledgerRouter);
router.use('/users', userRouter);

export default router;
