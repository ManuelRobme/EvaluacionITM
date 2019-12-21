


const Space = (props) =>  {
    if(props.size === "sm"){
        return <div className="space-sm"/>
    } else if(props.size === "md") {
        return <div className="space-md"/>
    } else if(props.size === "lg") {
        return <div className="space-lg"/>
    } else if(props.size === "xl") {
        return <div className="space-xl"/>
    } else {
        return <div className="space-sm"/>
    }
}
        
export default Space


