import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string
    title:string
    content : string
    // publishedDate: string
    id: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    id
    // publishedDate
}:BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                
                    <Avatar name={authorName || "Anonymous"}/>
                
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div> 
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                {/* <div className="pl-2 font-extralight text-slate-400 flex justify-center flex-col">
                    {publishedDate}
                </div> */}
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + "...."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length/1000)} Minute(s) Read`}
            </div>
        </div>
    </Link>
}
export function Circle(){
    return <div className="w-1 h-1 bg-gray-500 rounded-full">

    </div>
}


export function Avatar({name,size="small"}:{name: string, size?: "small"|"big"}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-500 rounded-full ${size==="small" ? "w-6 h-6": "w-10 h-10"} `}>
        <span className={`${size==="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>{name[0].toUpperCase() || "A"}</span>
    </div>
    
}