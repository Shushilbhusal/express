// 




//----------------------------------------------------MongoDb-----------------------------------------------------------

import { Request, Response } from "express";
import { createProductService, getProductService,getProductByIdService ,updateProductService,deleteProductService } from "../models/mongodb-models/Products/productServices";


const validateProduct=(data:any)=>{
  if(typeof data.product_name !== 'string' || !data.product_name.trim() ){
    return "product is required"
  }
  if(typeof data.price !=='number'){
    return "price should be in number"
  }
  if(typeof data.description !=='string' || !data.description.trim()){
    return "description is required"
  }
  return null;

}
export const createProduct= async (req:Request, res:Response)=>{
  // const {product_name, price, description, created_at, category}= req.body;
  const error= validateProduct(req.body);
    if (error) {
    res.status(400).json({ message: error });
    return;
  }
  const product = await createProductService(req.body);
 try {
    res.status(201).json(product);
  } catch (err) {
    res.send(err);
  }
}

export const getProduct= async(req:Request, res:Response)=>{
  const product= await getProductService ();
  res.status(200).json(product);

}

export const getProductById= async(req:Request, res:Response)=>{
  const id=req.params.id;
  const product= await getProductByIdService (id);
  res.status(200).json(product);

}

export const updateProductById= async(req:Request, res:Response)=>{
  const id=req.params.id;
  
  const{product_name, price, }= req.body;
  const product= await updateProductService ({product_id:id, product_name, price});
   if (!product) {
    res.status(404).json({ message: "product not found" });
    return;
  }
  res.status(200).json(product);
}

export const deleteProductById=async(req:Request, res:Response)=>{
  const id = req.params.id;
  const deletedProduct= deleteProductService(id);
  if(!deletedProduct){
  res.status(404).json({ message: "product not found" });
  }
  res.send("Product deleted successfully");
}