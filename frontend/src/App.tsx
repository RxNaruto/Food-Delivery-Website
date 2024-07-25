import { Routes,BrowserRouter,Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Alogin } from "./pages/aLogin";
import { Asignup } from "./pages/Asignup";
import { AdminPage } from "./pages/AdminPage";


function App(){
  return(
    <>
    <BrowserRouter >
    <Routes>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/alogin" element={<Alogin />}/>
    <Route path="/asignup" element={<Asignup />}/>
    <Route path="/aPage" element={<AdminPage />}/>
    

    </Routes>
    </BrowserRouter>
    </>
  )

}
export default App;