interface ButtonProp{
    label: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=>void;
}

export const Button=({label,onClick}: ButtonProp)=>{
    return <div className="bg-blue-200 w-20">
        <button onClick={onClick}>{label}</button>
    </div>

}