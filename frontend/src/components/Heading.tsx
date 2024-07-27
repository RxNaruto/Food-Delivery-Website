interface HeadingProps{
    label: String;
}
export const Heading=({label}:HeadingProps)=>{
    return <div className="text-5xl font-semibold text-white mb-2">
        {label}
    </div>

}