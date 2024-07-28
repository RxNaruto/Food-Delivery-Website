import { useNavigate } from "react-router-dom";

interface NavigateButtonProps{
    to: string;
    label: string;
}
export const NavigateButton=({to,label}: NavigateButtonProps)=>{
    const navigate = useNavigate();

    const handleClick=()=>{
        navigate(to);

    }

    return <div>
        <button onClick={handleClick} className="text-sm text-black hover:text-red-500">
            {label}
        </button>
    </div>

}