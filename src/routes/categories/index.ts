import express from 'express';
import categoryIdController from './[categoryId]';
import * as categoriesController from './categories.controller';

const router = express.Router({ mergeParams: true });

router.get('/users/:nickname', categoriesController.getCategories);
router.post('/', categoriesController.createCategory);
router.use('/:categoryId', categoryIdController);
export default router;
