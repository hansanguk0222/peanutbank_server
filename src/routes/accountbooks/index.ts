import express from 'express';
import * as accountbooksController from './accountbooks.controller';

const router = express.Router({ mergeParams: true });

router.get('/users/:nickname/years/:yyyy/months/:mm', accountbooksController.getAccountbooks);

export default router;
