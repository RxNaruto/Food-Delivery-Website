import { useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Alogin=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
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
        
        <Button label={"Login"} onClick={
            async()=>{
               try {
                const response = await axios.post("http://localhost:3000/api/v1/admin/login",{
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

}