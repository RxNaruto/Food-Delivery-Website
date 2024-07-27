import { useState,useEffect } from "react";
import axios from "axios";

interface Food{
    id: number;
    name: string;
    price: number;
    description: string;
}

interface SearchQueryProps{
    searchQuery?: string;
}

export const GettingFoods = ({searchQuery}:SearchQueryProps={})=>{
    const[foods,setFoods] = useState<Food[]>([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(false);

    useEffect(()=>{
        const fetchFood = async()=>{
            try {
                setLoading(true);
                setError(false);
                const token = localStorage.getItem('token');
                const url = searchQuery
                ? `https://localhost:3000/api/v1/food/getAll?search=${searchQuery}`
                : "https://localhost:3000/api/v1/food/getAll";
    
                const response = await axios.get<{foods: Food[]}>(url,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (Array.isArray(response.data.foods)) {
                    setFoods(response.data.foods);
                } else {
                    setError(true);
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data.msg || "Error fetching data");
                } else {
                    setError(true);
                }
                
            }finally{
                setLoading(false);
            }
        }
        fetchFood();
    },[searchQuery])

    return { foods,error,loading};


}

