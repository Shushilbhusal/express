import Product from './products.mongodb-model';

export const createProductService=async(data:{product_name:string, price:Number, description:string,created_at:Date, category:string})=>{
    const createProduct= new Product(data);
    return await createProduct.save();

}

export const getProductService=async()=>{
    return await Product.find();
}

export const getProductByIdService=async(id:string)=>{
    return await Product.findById(id);
}


export const updateProductService= async (data:{product_id:string, product_name:string, price:Number})=>{
    //  if( !data.product_name || !data.price) {
    //  const updatedData= await Product.updateOne({_id:data.product_id},{$set:{product_name:data.product_name, price:data.price}});
    //  return updatedData;

        //  }
        return  Product.findByIdAndUpdate(
          data.product_id,
          { product_name: data.product_name, price: data.price },
          { new: true } // This option returns the modified document rather than the original
        );
}


export const deleteProductService=async(id:string)=>{
    return await Product.deleteOne({_id:id});
}