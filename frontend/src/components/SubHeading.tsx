interface SubHeadingProps{
    label: String;
}
export const SubHeading=({label}:SubHeadingProps)=>{
    return <div className="text-sm text-slate-400 mb-2 font-bold">
        {label}
    </div>

}