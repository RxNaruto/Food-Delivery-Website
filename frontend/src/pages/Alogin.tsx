import { useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { Appbar } from "../components/Appbar"
import {toast} from "react-toastify"

export const Alogin=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();

  
    return <>
    <Appbar />
    <div className="flex flex-col h-screen justify-center items-center bg-image2">
        <div className="bg-slate-800 w-1/3 h-3/6 flex flex-col items-center justify-center drop-shadow-2xl rounded-md">
        <Heading label={"Login"} />
        <SubHeading label={"Enter Your Details Here"} />
        <InputBox label={"Email"} placeholder={"Jhon@mail.com"} onChange={
            (e)=>{
            setUsername(e.target.value)

        }}/>
        <InputBox label={"Password"} placeholder={"1231231"} onChange={
            (e)=>{
            setPassword(e.target.value);
        }}/>
        
        <Button label={"Login"} onClick={
            async()=>{
               try {
                const response = await axios.post("http://localhost:3000/api/v1/admin/login",{
                 username,
                 password,
                
                })
                localStorage.setItem("token",response.data.token);
                navigate("/restaurant");
                toast.success("Login Successful");
               } catch (error) {
                if(axios.isAxiosError(error)){
                    if(error.response?.status===400){
                        toast.error("Incorrect detail")
                    }
                    else if(error.response?.status===404){
                        toast.error("User doesn't exist")
                    }
                    else if(error.response?.status===401){
                        toast.error("Invalid Password");
                    }
                    else{
                        toast.error("Internal Server Error")
                    }
                }
                console.log(error);
                
               }
               
            }
        }/>
         <div className="flex">
        <SubHeading label={"Create an account"}/>
        <Link to={"/asignup"} className="text-white underline hover:text-red-500 pl-3">
        Signup
        </Link>
        </div>
        </div>

    </div>

    
    </>
}