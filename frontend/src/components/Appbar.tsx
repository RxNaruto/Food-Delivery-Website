import { NavigateButton } from "./AppBarButtons"

export const Appbar=()=>{
    return <div className="w-full h-20 bg-slate-100 grid grid-cols-2 items-center">
        <div className="text-5xl font-bold text-red-500 pl-3 ">Foody</div>
        <div className="flex justify-evenly">
            <NavigateButton to={"/login"} label={"Login"} />
            <NavigateButton to={"/login"} label={"Login"} />
            <NavigateButton to={"/asignup"} label={"Foody Business"} />
        </div>
    </div>
}