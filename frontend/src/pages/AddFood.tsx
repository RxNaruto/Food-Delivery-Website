import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                const response = await axios.post("http://localhost:3000/api/v1/admin/addFood",{
                    name,
                    price: parseInt(price),
                   description,
                    restaurantId: parseInt(restaurantId),
                    
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                navigate('/foodAdded');
            } catch (error){
                console.log(error);
                
            }

        
    }
    return <div>

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
}