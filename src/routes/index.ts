import express from 'express';
import categoryRouter from './categories';
import accountbookRouter from './accountbooks';
const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/accountbooks', accountbookRouter);
export default router;
