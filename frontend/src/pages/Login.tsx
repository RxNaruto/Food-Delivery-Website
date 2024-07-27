import { useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"

export const Login=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();

  
    return <div className="flex flex-col h-screen justify-center items-center bg-image2">
        <div className="bg-slate-800 w-1/3 h-3/6 flex flex-col items-center justify-center drop-shadow-2xl rounded-md">
        <Heading label={"Login"} />
        <SubHeading label={"Enter Your Details Here"} />
        <InputBox label={"username"} placeholder={"Jhon@mail.com"} onChange={
            (e)=>{
            setUsername(e.target.value)

        }}/>
        <InputBox label={"password"} placeholder={"1231231"} onChange={
            (e)=>{
            setPassword(e.target.value);
        }}/>
        
        <Button label={"Login"} onClick={
            async()=>{
               try {
                const response = await axios.post("http://localhost:3000/api/v1/user/login",{
                 username,
                 password,
                
                })
                localStorage.setItem("token",response.data.token);
                navigate("/home");
               } catch (error) {
                console.log(error);
                
               }
               
            }
        }/>
        </div>

    </div>

}