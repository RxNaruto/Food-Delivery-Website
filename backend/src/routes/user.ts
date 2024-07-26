import { Router } from "express";
import { signupTypes,loginTypes } from "../types/user";
import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
import { comparePassword, hashPassword } from "../types/hashing";
import { JWT_SECRET } from "../config";
const userRouter = Router();
const prisma = new PrismaClient();
interface signupBody{
    username: string;
    password: string;
    name: string;
    mobile: number;
}
userRouter.post("/signup",async(req,res)=>{
    const body: signupBody = req.body;
    const {success} = signupTypes.safeParse(body);
    if(!success){
        console.log(body);
        return res.status(400).json({
            message: "Incorrect details"
        })

    }
    const existingUser = await prisma.user.findFirst({
       where: {
        username: body.username
       }
    })
        
    if(existingUser){
         return res.status(406).json({
            message: "user already exist"
         })
    }

    try {
        
        const hashedPassword = await hashPassword(body.password);
        
        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                //@ts-ignore
                password: hashedPassword,
                name: body.name,
                mobile: body.mobile

            }
          
           
            
        })
        
        if(newUser){
           
            const token = jwt.sign({userId: newUser.id, role: 'user'},JWT_SECRET)
            console.log(newUser.id);
            res.status(200).json({
                message: "Signup complete",
                token: token
            })
        }
        else{
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

interface loginBody{
    username: string;
    password: string;
}
userRouter.post("/login",async(req,res)=>{
    const body: loginBody = req.body;
    const {success} = loginTypes.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Incorrect details"
        })

    }
    try {
        const eUser = await prisma.user.findFirst({
            where: {
                username: body.username,
            
            }
           
        })
        if (!eUser) {
            return res.status(404).json({
                message: "User not found"
            });
          }
        const hashPassword = await comparePassword(body.password,eUser.password);
        if (!hashPassword) {
            return res.status(401).json({
                message: "Invalid credentails"
            });
          }
       
        else{
            const token = jwt.sign({userId: eUser.id, role: 'user'},JWT_SECRET)
            res.status(200).json({
                message: "Signin complete",
                token: token
            })
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


export default userRouter;