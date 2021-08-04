import express from 'express';
import * as accountbooksController from './accountbooks.controller';
import { accessTokenCheck } from '@/src/middlewares/accessTokenCheck.middlewares';

const router = express.Router({ mergeParams: true });

router.get('/users/:nickname/years/:yyyy/months/:mm', accessTokenCheck, accountbooksController.getAccountbooks);

export default router;
