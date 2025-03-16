import { signupInput } from "@kartik_kk/medium"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [signupInputs,setSignupInputs] = useState<signupInput>({
        name: "", 
        email: "", 
        password: ""
    })
    
    async function sendRequest(){
        try { 
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup": "signin"}`,signupInputs)
            
            const jwt = response.data
            localStorage.setItem("token",jwt)
            navigate("/blogs")

        } catch (e){
            return "error while fetching"
        }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-15">
                    <div className="text-3xl font-extrabold ">
                        Create an Account
                    </div>
                    <div className="p-2 text-slate-400">
                        {type === "signin" ? "Don't Have an Account?":  "Already Have an Account"}
                        <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type==="signin" ? "Sign Up":"Sign In"}
                        </Link>
                    </div>
                </div>
                <div> 
                    {type == "signup" ? <LabelInput label="Name" placeholder="Name" onChange={(e)=>[
                        setSignupInputs({
                            ...signupInputs,
                            name: e.target.value
                        })
                    ]}/> : null }
                    <LabelInput label="Email" placeholder="Email" onChange={(e)=>[
                        setSignupInputs({
                            ...signupInputs,
                            email: e.target.value
                        })
                    ]}/>
                    <LabelInput label="Password" type="Password" placeholder="Password" onChange={(e)=>[
                        setSignupInputs({
                            ...signupInputs,
                            password: e.target.value
                        })
                    ]}/>
                    <div>
                        <button onClick={sendRequest} type="button" className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 w-full">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


interface LabelInputType {
    label : string
    placeholder: string
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelInput({label, placeholder, onChange,type}:LabelInputType){
    return <div className="p-2">
         <div>
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}