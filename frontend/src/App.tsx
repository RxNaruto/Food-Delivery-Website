import { Routes,BrowserRouter,Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Alogin } from "./pages/Alogin";
import { Asignup } from "./pages/Asignup";
import { AdminPage } from "./pages/AdminPage";
import { AddedRestaurant } from "./pages/AddedRestuarant";
import { AddRestaurants } from "./pages/AddRestaurant";
import { AddFood } from "./pages/AddFood";
import { AddedFood } from "./pages/AddedFood";
import {FoodGrid} from "./pages/AllFoodItems";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App(){
  return(
    <>
    <BrowserRouter >
    <ToastContainer />
    <Routes>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/alogin" element={<Alogin />}/>
    <Route path="/asignup" element={<Asignup />}/>
    <Route path="/aPage" element={<AdminPage />}/>
    <Route path="/resAdd" element={<AddedRestaurant />} />
    <Route path="/aRes" element={<AddRestaurants />} />
    <Route path="/aFood" element={<AddFood />} />
    <Route path="/foodAdded" element={<AddedFood />} />
    <Route path="/getFood" element={<FoodGrid />} />
    
    

    </Routes>
      
    </BrowserRouter>
    </>
  )

}
export default App;