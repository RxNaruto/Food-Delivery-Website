import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {toast } from "react-toastify"

export const AddFood=()=>{
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[description,setDescription] = useState("");
    const[restaurantId,setResId]= useState("");
    const navigate = useNavigate();

    const handleRequest = async ()=>{
        const token = localStorage.getItem("token");
        if(!token){
            console.log("You are not logged in");
            return;
        }
        
            try {
                    await axios.post("http://localhost:3000/api/v1/admin/addFood",{
                    name,
                    price: parseInt(price),
                   description,
                    restaurantId: parseInt(restaurantId),
                    
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success("Food added successfully");
                navigate('/foodAdded');
                
            } catch (error){
                if(axios.isAxiosError(error)){

                    if(error.response?.status===400){
                        toast.error("Incorrect detail")
                    }
                    else if(error.response?.status===401){
                        toast.error("You are not authorized");
                    }
                    else if(error.response?.status===403){
                        toast.error("Incorrect login credentials")
                    }
                   
                    else{
                        toast.error("Internal Server Error")
                    }
                }
                console.log(error);
                
            }

        
    }
    return <div className="flex flex-col h-screen justify-center items-center bg-image2">

        <div className="bg-slate-800 w-2/6 h-4/6 flex flex-col items-center justify-center drop-shadow-2xl rounded-md">
        <Heading label={"Add Food"}/>
        <SubHeading label={"Enter Food details here"} />
        <InputBox label={"Name"} placeholder={"Jaggi"} onChange={
            (e)=>{
                setName(e.target.value);
            }
        }/>
        <InputBox label={"Price"} placeholder={"100"} onChange={
            (e)=>{
                setPrice(e.target.value);
            }
        }/>
        <InputBox label={"Description"} placeholder={"Dairy Product"} onChange={
            (e)=>{
                setDescription(e.target.value);
            }
        }/>
        <InputBox label={"Restaurant Id"} placeholder={"1"} onChange={
            (e)=>{
                setResId(e.target.value);
            }
        }/>
        <Button label={"Add Food"} onClick={ handleRequest
           
        }
        />
        </div>

   </div>
}