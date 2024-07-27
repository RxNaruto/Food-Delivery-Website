interface ButtonProp{
    label: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=>void;
}

export const Button=({label,onClick}: ButtonProp)=>{
    return <div className="my-4">
        <button onClick={onClick} className="text-white bg-red-500 hover:bg-red-600  h-12 w-36 rounded-2xl ">{label}</button>
    </div>

}