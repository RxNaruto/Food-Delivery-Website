interface inputBox{
    label: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void;
}

export const InputBox=({label,placeholder,onChange}:inputBox)=>{
    return <div>
        <div>
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange} />
    </div>

}