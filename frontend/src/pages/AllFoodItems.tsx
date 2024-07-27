import axios from "axios";
import { useEffect, useState } from "react";

interface Food {
    id: number;
    name: string;
    description: string;
    price: number;
}

export const AllFoodItems = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const gettingFood = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get<{ foods: Food[] }>("http://localhost:3000/api/v1/food/getAll", {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });

               
                if (Array.isArray(response.data.foods)) {
                    setFoods(response.data.foods);
                } else {
                    setError("Unexpected response format");
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data.msg || "Error fetching data");
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        gettingFood();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>All Food Items</h1>
            <ul>
                {foods.map((food) => (
                    <li key={food.id}>
                        <h2>{food.name}</h2>
                        <p>{food.description}</p>
                        <p>Price: Rs. {food.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
