import { useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"

export const Signup=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    const[mobile,setMobile]=useState("");
    const navigate = useNavigate();
    return <div className="flex flex-col h-screen justify-center items-center bg-image2">
        <div className="bg-slate-800 w-2/6 h-4/6 flex flex-col items-center justify-center drop-shadow-2xl rounded-md">
        
            <Heading label={"Signup"}/>
            <SubHeading label={"Enter you details here"} />
        <InputBox label={"Email"} placeholder={"Jhon@gmail.com"} onChange={
            (e)=>{
            setUsername(e.target.value)

        }}/>
        <InputBox label={"Password"} placeholder={"1231231"} onChange={
            (e)=>{
            setPassword(e.target.value);
        }}/>
        <InputBox label={"Name"} placeholder={"Jhon"} onChange={
            (e)=>{
            setName(e.target.value);
        }}/>
        <InputBox label={"Mobile"} placeholder={"9898989898"} onChange={
            (e)=>{
                setMobile(e.target.value);
            }
        }/>
        <Button label={"Signup"} onClick={
            async()=>{
               try {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                 username,
                 password,
                 name,
                 mobile: parseInt(mobile)
                })
                localStorage.setItem("token",response.data.token);
                navigate("/getFood");
               } catch (error) {
                console.log(error);
               }
            }
        }/>
        </div>
      

    </div>

}