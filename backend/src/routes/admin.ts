import { Router } from "express";
import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"
import { comparePassword, hashPassword } from "../types/hashing";
import { JWT_SECRET } from "../config";
import { addingRestaurant, adminloginTypes, adminsignupTypes, foodTypes } from "../types/admin";
import { adminAuth } from "../middleware/adminAuth";
import { CustomRequest } from "../types/CustomRequest";
const adminRouter = Router();
const prisma = new PrismaClient();
interface signupBody{
    username: string;
    password: string;
    name: string;
    mobile: number;
}
adminRouter.post("/signup",async(req,res)=>{
    const body: signupBody = req.body;
    const {success} = adminsignupTypes.safeParse(body);
    if(!success){
        console.log(body);
        return res.status(400).json({
            message: "Incorrect details"
        })

    }
    const existingUser = await prisma.admin.findFirst({
       where: {
        username: body.username
       }
    })
        
    if(existingUser){
         return res.status(409).json({
            message: "user already exist"
         })
    }

    try {
        
        const hashedPassword = await hashPassword(body.password);
        
        const newUser = await prisma.admin.create({
            data: {
                username: body.username,
                //@ts-ignore
                password: hashedPassword,
                name: body.name,
                mobile: body.mobile

            }
          
           
            
        })
        
        if(newUser){
           
            const token = jwt.sign({adminId: newUser.id,role: 'admin'},JWT_SECRET)
            console.log(newUser.id);
            res.status(200).json({
                message: "Signup complete",
                token: token,
                adminId: newUser.id
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
adminRouter.post("/login",async(req,res)=>{
    const body: loginBody = req.body;
    const {success} = adminloginTypes.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Incorrect details"
        })

    }
    try {
        const eUser = await prisma.admin.findFirst({
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
            const token = jwt.sign({adminId: eUser.id, role: 'admin'},JWT_SECRET)
            res.status(200).json({
                message: "Signin complete",
                token: token,
                adminId:eUser.id
            })
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

interface addResTypes{
    name: string;
    address: string;
    contact: number;
    email: string;

}



adminRouter.post("/addRes",adminAuth, async(req:CustomRequest,res)=>{
    const body:addResTypes =  req.body;
    const {success} = addingRestaurant.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Incorrect Details"
        })
    }
    try {
        if(!req.adminId){
            return res.status(400).json({
                message: "Admin id is missing"
            })
        }
        const addRes = await prisma.restaurants.create({
            data: {
                name: body.name,
                address: body.address,
                contact: body.contact,
                email: body.email,
                adminId: req.adminId
            }
        })
        res.status(200).json({
            message: "Restaurant added successfully",
            restaurantID: addRes.id
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
        
    }
})

interface addFood{
    name: string;
    price: number;
    description: string;
    restaurantId: number;
}

adminRouter.post("/addFood",adminAuth,async(req,res)=>{
    const body: addFood = req.body;
    const {success} = foodTypes.safeParse(body);
    if(!success){
        return res.status(400).json({
            message: "Incorrect details"
        })
    }
    try {
        const food = await prisma.food.create({
            data: {
                name: body.name,
                price: body.price,
                description: body.description,
                restaurantId: body.restaurantId
            }
        })

        res.status(200).json({
            message: "Food item added Successfully",
            itemId: food.id
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
        
        
    }



})
adminRouter.get("/allRestuarant",adminAuth,async(req:CustomRequest,res)=>{
    const restuarantId = Number(req.query.restuarantId);
    try {
        if(restuarantId){
            const response = await prisma.restaurants.findFirst({
                where: {
                    id: restuarantId
                }
            })
            res.status(200).json({
                data: response
            })
        }
        else{
            const response = await prisma.admin.findFirst({
                where: {
                    id: req.adminId
                },
               select:{
                restaurant: true
               }
            });
            res.status(200).json({
                data: response
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
})

adminRouter.get("/allRestaurant/ser")


export default adminRouter;