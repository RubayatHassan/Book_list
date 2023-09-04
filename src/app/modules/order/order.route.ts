import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.getAllFromDB)

router.get('/:id', OrderController.getByIdFromDB);

router.post(
    '/',
    OrderController.insertIntoDB
)

router.patch(
    '/:id',
    OrderController.updateIntoDB)

router.delete(
        '/:id',
        OrderController.deleteFromDB);
                 
export const OrderRoutes = router;