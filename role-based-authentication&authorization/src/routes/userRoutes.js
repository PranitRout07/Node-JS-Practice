import express from 'express'
import verifyToken from '../middlewares/authMiddlewares.js';

const router = express.Router();
router.get("/admin",verifyToken,(req,res)=>{ res.json({message:"Hello admin"})})
router.get("/user",verifyToken,(req,res)=>{ res.json({message:"Hello user"})})
router.get("/manager",verifyToken,(req,res)=>{ res.json({message:"Hello manager"})})

const userRoutes = router
export default userRoutes;