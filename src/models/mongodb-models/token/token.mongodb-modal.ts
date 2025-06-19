import mongoose from "../mongodb-client";

const tokenSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.ObjectId, 
        ref:"User"
    },
    token:{
    type: String,
    required:true
    },
    created_at:{
        type: Date,
        default: Date.now(),
    }
})

export const TokenModal = mongoose.model("Token", tokenSchema);