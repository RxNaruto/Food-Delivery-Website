import { NavigateButton } from "./AppBarButtons"

export const Appbar=()=>{
    return <div className="w-full h-20 bg-slate-100 grid grid-cols-2 items-center">
        <div className="text-5xl font-bold text-red-500 pl-3 ">Foody</div>
        <div className="flex justify-evenly">
            <NavigateButton to={"/asignup"} label={"Foody Buisness"} />
            <NavigateButton to={"/home"} label={"Home"} />
            <NavigateButton to={"/getFood"} label={"Food"} />
            <NavigateButton to={"/signup"} label={"Signup"} />
        </div>
    </div>
}