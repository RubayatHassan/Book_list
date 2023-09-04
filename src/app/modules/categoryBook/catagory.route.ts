import express from 'express';
import { CategoryController } from './category.controller';
const router = express.Router();


router.get('/', CategoryController.getAllFromDB)

router.get('/:id', CategoryController.getByIdFromDB);


router.post(
    '/',
    CategoryController.insertIntoDB
)

router.patch(
    '/:id',
    CategoryController.updateIntoDB)

router.delete(
        '/:id',
        CategoryController.deleteFromDB);
         
         
export const UserRoutes = router;