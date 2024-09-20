import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1]
        if (!token){
            res.status(401).json({message:"Access denied"})
        }


        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode;
            console.log(decode,req.url.split("/")[1])
            next()
            // if(decode.role==="user"|| decode.role==="admin" || decode.role==="manager" && req.url.split("/")[1]==="admin"  ){
            //     next();
            // }else if(decode.role==="user" && req.url.split("/")[1]==="user"){
            //     console.log("d")
            //     next();
            // }else if(decode.role==="manager" || decode.role==="user" && req.url.split("/")[1]==="manager"){
            //     next();
            // }else{
            //     res.status(400).json({message:"Access denied"})
            // }

        }catch(error){
            res.status(400).json({message:"Access denied"})
        }

        
    }
}

export default verifyToken