import express from 'express';
import { OrderBookController } from './orderbook.controller';



const router = express.Router();

router.get('/', OrderBookController.getAllFromDB)

router.get('/:id', OrderBookController.getByIdFromDB);

router.post(
    '/',
    OrderBookController.insertIntoDB
)

router.patch(
    '/:id',
    OrderBookController.updateIntoDB)

router.delete(
        '/:id',
        OrderBookController.deleteFromDB);
                 
export const OrdersBookRoutes = router;