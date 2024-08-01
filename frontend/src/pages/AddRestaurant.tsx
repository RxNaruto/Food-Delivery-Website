import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {toast} from "react-toastify"

export const AddRestaurants=()=>{
    const[name,setName] = useState("");
    const[address,setAddress] = useState("");
    const[contact,setContact] = useState("");
    const[email,setEmail]= useState("");
    const navigate = useNavigate();

    const handleRequest = async ()=>{
        const token = localStorage.getItem("token");
        if(!token){
            console.log("You are not logged in");
            return;
        }
        
            try {
                 await axios.post("http://localhost:3000/api/v1/admin/addRes",{
                    name,
                    address,
                    contact: parseInt(contact),
                    email,
                    
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success("Restaurant added successfully")
                navigate('/restaurant');

            } catch (error){
                if(axios.isAxiosError(error)){
                    if(error.response?.status===400){
                        toast.error("Incorrect detail")
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
        <Heading label={"Add Restaurant"}/>
        <SubHeading label={"Enter restaurant details here"} />
        
        <InputBox label={"Name"} placeholder={"Jaggi"} onChange={
            (e)=>{
                setName(e.target.value);
            }
        }/>
        <InputBox label={"Address"} placeholder={"Patiala"} onChange={
            (e)=>{
                setAddress(e.target.value);
            }
        }/>
        <InputBox label={"Contact"} placeholder={"9898989898"} onChange={
            (e)=>{
                setContact(e.target.value);
            }
        }/>
        <InputBox label={"Email"} placeholder={"Jhon@mail.com"} onChange={
            (e)=>{
                setEmail(e.target.value);
            }
        }/>
        <Button label={"Add Restaurant"} onClick={ handleRequest
           
        }
        />

        </div>
   </div>
}