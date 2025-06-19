// import Express, { Router } from 'express'
// import { getAllOrderController,
//          getOrderByIdController,
//          postOrderByIdController,
//          updateOrderByIdController,
//          deleteOrderByIdController
//     }
//   from "../controller/orderController";

// const orderRouter = Express.Router(); 

// orderRouter.get('/', getAllOrderController );
// orderRouter.get('/:id', getOrderByIdController);
// orderRouter.post('/', postOrderByIdController);
// orderRouter.put('/:id', updateOrderByIdController );
// orderRouter.delete('/:id', deleteOrderByIdController);

// export  {orderRouter};

import Express, { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
} from '../controller/orderController';

const orderRouter = Express.Router();

orderRouter.post('/', createOrder);
orderRouter.get('/', getAllOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrderById);
orderRouter.delete('/:id', deleteOrderById);

export { orderRouter };