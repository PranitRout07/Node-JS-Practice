import { Schema } from "mongoose";
import mongoose from "mongoose";


const userSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ["admin","manager","user"],
    }
},{
    timestamps:true,
})

const User = mongoose.model('User', userSchema);

export default User;