import axios from "axios";
import { useEffect, useState } from "react";

interface ResTypes {
    id: number;
    name: string;
    address: string;
    contact: number;
    email: string;
}

export const RestaurantHook = () => {
    const [restaurant, setRestaurants] = useState<ResTypes[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       const getRestaurants=async()=>{
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/v1/admin/allRestuarant",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setRestaurants(response.data.data.restaurant);
        } catch (error) {
            setError(false);
            
        }finally{
            setLoading(false);
        }

    }
    getRestaurants();

}, []);

    return { restaurant, error, loading };
}
