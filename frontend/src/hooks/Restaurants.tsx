import axios from "axios"
import { useEffect, useState } from "react"

interface addResTypes{
    name: string;
    address: string;
    contact: number;
    email: string;

}

export const Restaurants=()=>{
    const [restaurant,setRestaurants] = useState<addResTypes[]>([]);
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        const getRestaurants=async()=>{
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/admin/allRestuarant",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setLoading(false);
                setRestaurants(response.data.data);
            } catch (error) {

                
            }
        }
    },[])
}