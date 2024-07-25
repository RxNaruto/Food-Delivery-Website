import { NextFunction, Request,Response } from "express";
import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { CustomRequest } from "../types/CustomRequest";


interface DecodedToken{
    adminId: number
}



export const adminAuth=(req: CustomRequest,res: Response,next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET) as DecodedToken;
        req.adminId = decoded.adminId;
        console.log(decoded.adminId);
        next();

    }catch(e){
        return res.status(403).json({ message: "Invalid token" });
    }

}