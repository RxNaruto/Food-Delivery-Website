import { useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    const[mobile,setMobile]=useState("");
    const navigate = useNavigate();
    return <div>
        <InputBox label={"username"} placeholder={"Jhon@mail.com"} onChange={
            (e)=>{
            setUsername(e.target.value)

        }}/>
        <InputBox label={"password"} placeholder={"1231231"} onChange={
            (e)=>{
            setPassword(e.target.value);
        }}/>
        <InputBox label={"name"} placeholder={"Jhon"} onChange={
            (e)=>{
            setName(e.target.value);
        }}/>
        <InputBox label={"mobile"} placeholder={"9898989898"} onChange={
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
                navigate("/home");
               } catch (error) {
                console.log(error);
               }
            }
        }/>

    </div>

}