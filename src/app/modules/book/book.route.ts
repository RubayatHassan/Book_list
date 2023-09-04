import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();


router.get('/', BookController.getAllFromDB);

router.get('/:id', BookController.getByIdFromDB);


router.post(
    '/',
    
    BookController.insertIntoDB
);

router.patch(
    '/:id',
    BookController.updateIntoDB);

router.delete(
        '/:id',
        BookController.deleteFromDB);
         
         
export const BookRoutes = router;