import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  product_name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  category: Schema.Types.ObjectId;
}
const productSchema = new Schema<IProduct>(
    {
      product_name :{
        type: String,
        required: true, 
      },
      description:{
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
      },
      created_at:{
        type: Date,
        default: Date.now,
        required: true
      } ,
      updated_at:{
        type: Date,
        default: Date.now,
        required: false
      
      } ,
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }
    }
)

// const Product = mongoose.model("Product", productSchema);

// export default Product;

export default mongoose.models.Product || 
mongoose.model<IProduct>("Product", productSchema);