import express from 'express';
import { BookRoutes } from '../modules/book/book.route';
import { CategoriesRoutes } from '../modules/categoryBook/catagory.route';
import { OrderRoutes } from '../modules/order/order.route';
import { OrdersBookRoutes } from '../modules/orderedBook/orderbook.route';
import { ReviewAndRatingRoutes } from '../modules/review and rating/review&rating.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/users",
    route: UserRoutes
  },
  {
    path: "/books",
    route: BookRoutes
  },
  {
    path: "/categories",
    route: CategoriesRoutes
  },
  {
    path: "/reviews&ratting",
    route: ReviewAndRatingRoutes
  },
  {
    path: "/Orders",
    route: OrderRoutes
  },
  {
    path: "/Orderbooks",
    route: OrdersBookRoutes
  },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;