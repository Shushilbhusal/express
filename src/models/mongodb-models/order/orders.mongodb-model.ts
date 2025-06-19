import mongoose, { Schema, Types } from "mongoose";

export interface IOrder extends Document {
  user_id: Types.ObjectId;
  product_id: Types.ObjectId[];
  createdAt: Date;
  total_amount: number;
  created_at: Date;
}

const orderSchema = new Schema({
     user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      product_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }  ],
      total_amount: {
        type: Number,
        required: false
      },
      created_at: {
        type: Date,
        default: Date.now,
        required: true
      }
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);