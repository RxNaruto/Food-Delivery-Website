
import { useNavigate } from "react-router-dom";
import { FoodItems } from "../hooks/FoodItems";


export const FoodGrid = () => {
    const { foods, loading, error } = FoodItems();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {foods.map((food) => (
                <div
                    key={food.id}
                    className="bg-blue-300 p-4 rounded-lg shadow-md cursor-pointer"
                    onClick={() => navigate(`/food/${food.id}`)}
                >
                    
                    <h2 className="text-xl font-bold">{food.name}</h2>
                    <p className="text-gray-700">{food.description}</p>
                    <p className="text-green-600 font-bold">Price: Rs. {food.price}</p>
                </div>
            ))}
        </div>
    );
};

