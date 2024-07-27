import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

interface urlP{
    urlPath: string;
}
export const GettingFoods=({urlPath}:urlP)=>{
    const[food,setFood]=useState("");
    const[error,setError]=useState(false);
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
        ;(async()=>{
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(urlPath);
                console.log(response);
                setFood(response.data.foods);
                setLoading(false);
    
            } catch (error) {
                setError(true);
                setLoading(false);
                
            }
        })()
    },[])

    return [food,error,loading]
}