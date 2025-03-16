import axios from "axios"
import { Appbar } from "./Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const[title,setTitle] = useState("")
    const[description,setDescription] = useState("")
    const navigate = useNavigate()
    return <div>
                <Appbar />
            <div className="flex justify-center pt-8"> 
                <div className="max-w-screen-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Blog Title</label>
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }} className="focus:outline-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title" />
                    <TextEditor onChange={(e)=>{
                        setDescription(e.target.value)
                    }} />
                </div>
                <div>
                    <button onClick={async()=>{
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} className="focus:outline-none mt-2 p-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                    Publish post
                </button>
                </div>
            </div>
            
            </div>
}

function TextEditor({onChange} : {onChange : (e: ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div className="pt-4 ">   
            <div>
                <div className="px-4 py-2 bg-slate-100">
                <textarea onChange= {onChange} rows={8} className="focus:outline-none w-screen text-sm text-gray-800 rounded-lg" placeholder="Write an article..." ></textarea>
                </div>
            </div>

        </div>
}