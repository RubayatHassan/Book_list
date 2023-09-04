import express from 'express';
import { ReviewAndRatingController } from '../review and rating/review&rating.controller';

const router = express.Router();

router.get('/', ReviewAndRatingController.getAllFromDB)

router.get('/:id', ReviewAndRatingController.getByIdFromDB);

router.post(
    '/',
    ReviewAndRatingController.insertIntoDB
)

router.patch(
    '/:id',
    ReviewAndRatingController.updateIntoDB)

router.delete(
        '/:id',
         ReviewAndRatingController.deleteFromDB);
                 
export const UserRoutes = router;