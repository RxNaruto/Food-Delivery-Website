import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                const response = await axios.post("http://localhost:3000/api/v1/admin/addRes",{
                    name,
                    address,
                    contact: parseInt(contact),
                    email,
                    
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                navigate('/resAdd');
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
}