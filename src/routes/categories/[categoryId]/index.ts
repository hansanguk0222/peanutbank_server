import express from 'express';
import * as categoryIdController from './categoryId.controller';

const router = express.Router({ mergeParams: true });

router.put('/users/:nickname', categoryIdController.updateCategoryColor);
export default router;
