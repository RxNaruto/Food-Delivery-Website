import { NextFunction, Request,Response } from "express";
import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { CustomRequest } from "../types/CustomRequest";


interface DecodedToken{
    userId: number;
    role: string;
}



export const userAuth=(req: CustomRequest,res: Response,next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET) as DecodedToken;
        if(decoded.role!=='user'){
            return res.status(403).json({ message: "Access denied" });

        }
        req.adminId = decoded.userId;
        console.log(decoded.userId);
        next();

    }catch(e){
        return res.status(403).json({ message: "Invalid token" });
    }

}