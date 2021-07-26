import express from 'express';
import * as userController from './user.controller';
import { oauthTokenCheck } from '@/src/middlewares/oauthTokenCheck.middlewares';
const router = express.Router({ mergeParams: true });

router.post('/login/google', oauthTokenCheck, userController.googleLogin);

export default router;
