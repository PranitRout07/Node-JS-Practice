import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
export const DbConnect  = async () => {
    try{

    console.log(process.env.PORT)
    const connect = await mongoose.connect(process.env.URL)
    console.log(
        `Database connected : ${connect.connection.host},${connect.connection.port}`
    
    )}catch(err){
        console.log(err);
        process.exit(1);
    }
}