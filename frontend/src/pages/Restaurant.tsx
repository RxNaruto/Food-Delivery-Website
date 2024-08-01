import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { RestaurantHook } from "../hooks/RestaurantHook"

export const Restaurant=()=>{
    const{restaurant,error,loading}= RestaurantHook();
    const navigate= useNavigate();
    console.log("restuarant data");
    console.log(restaurant);
    if(loading){
        return <div>loading...</div>

    }
    if(error){
        return <div>Something went wrong</div>
    }
    return <div>
        <div className="grid grid-cols-4 p-4 gap-4">
          {restaurant.map((data)=>(
            <div className="bg-red-500 p-5 rounded-md shadow-md " key={data.id}>
                <h2 className="text-lg font-bold">Name: {data.name}</h2>
                <p className="text-gray-700">Address: {data.address}</p>
                <p className="text-green-500">Contact: {data.contact}</p>
            </div>
          ))}

    </div>
    <div>
        <Button label={"Add another Restaurant"} onClick={()=>{
            navigate("/aRes");
        }}/>
    </div>
    </div>
}