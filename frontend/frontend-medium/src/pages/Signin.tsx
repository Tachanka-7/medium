import { Auth } from "../components/Auth"
import { Quote } from "../components/Quotes"

export const Signin = () =>{
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin"/>  
            </div>
            <div>
                <Quote />
            </div>
        </div>
    </div>
}