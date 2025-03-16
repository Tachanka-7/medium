import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : Blog) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">   
            <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-2xlpr-2 flex flex-col justify-center">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 font-light pt-2">
                        Posted On: 2nd March 2025
                    </div>
                    <div className="text-md pt-2 text-slate-700">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    Author
                    <div className="flex w-full">
                        <div className="pr-2 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                        </div>
                        <div className="pl-2">
                            <div className="pt-2 text-xl font-medium">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-1 text-md font-light text-slate-500"> 
                                Random Details about the author
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}