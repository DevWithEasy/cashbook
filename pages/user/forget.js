import { useRouter } from "next/router"
import { useState } from "react"
import Header from "../../components/Header"
import { findAccount } from "../../libs/AllUserAction"
import { forgetVerify, sendForgetMail } from "../../libs/verifyAccount"

export default function Forget(){
    const router = useRouter()
    const [find,setFind] = useState(false)
    const [finded,setFinded] = useState(false)
    const [change,setChange] = useState(false)
    const [email,setEmail] = useState("")
    const [code,setCode] = useState("")
    const [password,setPassword] = useState("")
    const [user,setUser] = useState({})
    return(
        <div className="relative flex justify-center min-h-screen pt-12 bg-gray-100">
            <Header/>
            <div className="bg-white w-8/12 pt-6 space-y-3">

                {!find && <div className="mx-3 space-y-3 border rounded">
                    <h3 className="px-2 pt-2 text-xl">Find your account</h3>
                    <hr />
                    <div className="px-2 pb-2 space-y-3">
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded focus:outline-none focus:border-blue-400" placeholder="enter your email"/>
                        <button onClick={()=>findAccount(email,setUser,setFind,setFinded)} className="border rounded px-4 py-2 bg-blue-300">Search</button>
                    </div>
                </div>}


                {finded && <div className="flex mx-3 border rounded p-4">
                    <div className="flex justify-center items-center">
                        <img src="" alt="" className="w-16 h-16 rounded-full ring-2"/>
                    </div>
                    <div className="pl-4">
                        <p className="">{user?.name}</p>
                        <p className="">{user?.email}</p>
                        <button onClick={()=>sendForgetMail(user.email,setFinded,setChange)} className="border rounded mt-5 px-4 py-1 bg-blue-300">send code</button>
                    </div>
                </div>}
                {change && <div className="mx-3 space-y-3 border rounded">
                    <h3 className="px-2 pt-2 text-xl">Change password</h3>
                    <hr />
                    <div className="px-2 pb-2 space-y-3">
                        <input type="text" onChange={(e)=>setCode(e.target.value)} className="w-full border p-2 rounded focus:outline-none focus:border-blue-400" placeholder="enter your code"/>
                        <input type="text" onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded focus:outline-none focus:border-blue-400" placeholder="enter your new password"/>
                        <input type="text" onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded focus:outline-none focus:border-blue-400" placeholder="enter confirm password"/>
                        <button onClick={()=>forgetVerify(email,password,code,router)} className="border rounded px-4 py-2 bg-blue-300">Change</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}