interface inputBox{
    label: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void;
}

export const InputBox=({label,placeholder,onChange}:inputBox)=>{
    return <div>
        <div className="text-white text-lg">
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange}  className="w-72 h-12 rounded-2xl bg-slate-800  border-2 border-red-500 text-center mb-2 text-white"/>
    </div>

}