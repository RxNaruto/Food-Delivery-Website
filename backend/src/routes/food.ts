import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { userAuth } from "../middleware/userAuth";
const foodRouter = Router();

const prisma = new PrismaClient();

foodRouter.get("/getAll",userAuth,async(req: Request,res: Response)=>{

    try {
        let response;
        if(req.query.search){
            const searchQuery = req.query.search.toString();
            response = await prisma.food.findMany({
                where: {
                    name: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            })
            res.status(200).json({
                foods: response
            })
        }
        else{
            response = await prisma.food.findMany({
                include:{
                    restaurant:{
                        select:{
                            name: true
                        }
                    }
                }
            });
        res.status(200).json({
            foods: response
        })

        }

         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server error"
        })
        
    }

})

export default foodRouter;