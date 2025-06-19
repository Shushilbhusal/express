
// import { Request, Response } from "express";
// import { orderModel } from "../sql-models/orders.sql.models";
// import { userModel } from "../sql-models/user.sql-models";
// import { SqlProductModel } from "../sql-models/product.sql-models";
// import { get } from "http";

// function validateOrderInput(body: any) {
//   if (typeof body.user_id !== "number") {
//     return "userId must be a number";
//   }
//   if (!Array.isArray(body.product_id) || body.product_id.length === 0) {
//     return "productIds must be a non-empty array";
//   }
//   // Check if user exists
//   if (! userModel.getOneUser(body.user_id)) {
//     return "User does not exist";
//   }
//   // Check if all products exist
//   for (const pid of body.product_id) {
//     if (!SqlProductModel.getProductByIdName(pid)) {
//       return `Product with id ${pid} does not exist`;
//     }
//   }
//   return null;
// }

// export const getAllOrderController = async (req: Request, res: Response) => {
//     const allOrders = await orderModel.getAllOrders()
//     if(!allOrders) res.status(404).json({error: "No orders found"});
//     res.json(allOrders);
// };

// export const getOrderByIdController=async (req:Request, res:Response)=>{
//     const id= parseInt(req.params.id);
//     const getOneOrder= await orderModel.getOneOrderById(id);
//     console.log(getOneOrder);
//     if(!getOneOrder) res.status(404).json({error: "Order not found"});
//     res.json(getOneOrder);
   
    
// };

// export const postOrderByIdController=async(req:Request, res:Response)=>{
//    const error = validateOrderInput(req.body);
//   if (error) {
//     res.status(400).json({ message: error });
//     return;
//   }
//   try {
//     const order = await orderModel.createOrder(req.body);
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const updateOrderByIdController=(req:Request, res:Response)=>{
//  {
//   const id = Number(req.params.id);
//   const order = orderModel.getOneOrderById(id);
//   if (!order) {
//     res.status(404).json({ message: "Order not found" });
//     return;
//   }
//   const error = validateOrderInput({ ...order, ...req.body });
//   if (error) {
//     res.status(400).json({ message: error });
//     return;
//   }
//   try {
//     const updated = orderModel.updateOrderById(id, req.body);
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }};

// export const deleteOrderByIdController = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const deleted = await orderModel.deleteOrderById(id);
//   if (!deleted) {
//     res.status(404).json({ message: "Order not found" });
//     return;
//   }
//   res.status(200).json({ message: "Order deleted successfully" });
// };

//----------------------------------------------MongoDB Implementation---------------------------------------------

import { Request, Response } from "express";
import {MongoOrderService} from "../models/mongodb-models/order/orderService";

const validateOrder = (data: any) => {
  if (!data.user_id || typeof data.user_id !== "string") {
    return "user_id is required and must be a string";
  }
  if (!data.product_id || !Array.isArray(data.product_id) || data.product_id.length === 0) {
    return "product_id is required and must be a non-empty array";
  }
  if (typeof data.total_amount !== "number" || data.total_amount <= 0) {
    return "total_amount must be a positive number";
  }
  return null;
};

export const createOrder = async (req: Request, res: Response) => {
  const error = validateOrder(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }

  try {
    const order = await MongoOrderService.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await MongoOrderService.getAll();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const order = await MongoOrderService.getById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err });
  }
};

export const updateOrderById = async (req: Request, res: Response) => {
  const id = req.params.id;
  // const error = validateOrder(req.body);
  //if (error) {
  //   res.status(400).json({ message: error });
  //   return;
  // }

  try {
    const updatedOrder = await MongoOrderService.update(id, req.body);
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err });
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleted = await MongoOrderService.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", error: err });
  }
};