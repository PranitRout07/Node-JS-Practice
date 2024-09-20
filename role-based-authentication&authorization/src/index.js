import express from "express";
import dotenv from "dotenv"
import { DbConnect } from "./config/dbConnect.js";
import router from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import verifyToken from "./middlewares/authMiddlewares.js";
DbConnect();
const app = express();


app.use(express.json())

app.use("/api/auth",router)
app.use("/api/users",verifyToken,userRoutes)

const port = process.env.PORT 
app.listen(port,()=>{
    console.log("Listening on port:",port)
})