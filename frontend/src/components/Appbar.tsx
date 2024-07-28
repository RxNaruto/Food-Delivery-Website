import { NavigateButton } from "./AppBarButtons"

export const Appbar=()=>{
    return <div className="flex w-full h-20 bg-slate-200">
        <div>Foody</div>
        <div className="flex">
            <NavigateButton to={"/login"} label={"Login"} />
        </div>
    </div>
}