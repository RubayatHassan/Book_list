import express from 'express';
import { UserRoutes } from '../modules/bookUser/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/users",
    route: UserRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;