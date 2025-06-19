import { Schema } from "mongoose";
import mongoose from "../mongodb-client";



const userSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_role:{
        type: String,
        enum: ['admin', 'user'],
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: false
    }
});


const User= mongoose.model('User', userSchema);

export default User;

