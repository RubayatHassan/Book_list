import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();


router.get('/', UserController.getAllFromDB)

router.get('/:id', UserController.getByIdFromDB);


router.post(
    '/',
    validateRequest(UserValidation.create),
    UserController.insertIntoDB
)

router.patch(
    '/:id',
    UserController.updateIntoDB)

router.delete(
        '/:id',
         UserController.deleteFromDB);
         
         
export const UserRoutes = router;