import axios from "axios";
import { useEffect, useState } from "react";

interface Food{
    name: string;
    id: number;
    description: string;
    price: number;
    restaurantId: number;
    restaurant: {
        name: string;
    };
}

interface UseFoodItems{
    searchQuery?: string;
}

export const FoodItems = ({searchQuery}: UseFoodItems={})=>{
    const[foods,setFoods] = useState<Food[]>([]);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(false);

    useEffect(()=>{
        const fetchFood = async()=>{
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<{ foods: Food[] }>(
                "http://localhost:3000/api/v1/food/getAll",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: searchQuery ? { search: searchQuery } : {}
                }
            );
            setFoods(response.data.foods);
            console.log(response.data.foods);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data.msg || "Error fetching data");
                } else {
                    setError(false);
                }
                
            }finally{
                setLoading(false);
            }
        }
        fetchFood();

        

    },[searchQuery])

    return {foods, error,loading}
}

