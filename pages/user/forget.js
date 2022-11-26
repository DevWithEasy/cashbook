import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Header from "../../components/Header"
import { findAccount } from "../../libs/AllUserAction"
import { forgetVerify, sendForgetMail } from "../../libs/verifyAccount"
import user_image from "../../public/image/profile.png"
import logo from "../../public/image/forget.png"
import Head from "next/head"

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
        <div className="relative flex justify-center min-h-screen pt-16 pb-4 bg-gray-300">
            <Head>
                <title>Forget password</title>
                <meta name="description" content="Forget CashBook" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <div className="flex justify-between w-8/12 bg-gray-100 p-4 rounded-md">
                <div className="hidden w-1/2 md:flex justify-center items-center bg-blue-200 rounded-md p-4">
                    <div className="w-40 h-40">
                        <Image src={logo} alt="" className=""/>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex items-center">
                    {!find && <div className="w-full mx-3 space-y-3">
                        <h3 className="text-2xl font-bold text-sky-900">Forget Password ?</h3>
                        <p className="text-sm text-gray-500">Enter the email address associated with you account.</p>
                        <div className="space-y-3">
                            <input type="text" onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2" placeholder="Email"/>
                            <div className="flex justify-between items-center">
                                <Link href=""><a className="text-sky-700">Try to another way</a></Link>
                                <button onClick={()=>findAccount(email,setUser,setFind,setFinded)} className="border px-6 py-2 bg-sky-800 text-white rounded-full shadow-lg">Next</button>
                            </div>
                        </div>
                    </div>}

                    {finded && <div className="w-full p-4 space-y-3">
                        <h3 className="text-2xl font-bold text-sky-900">Reset password</h3>
                        <div className="flex items-center p-4 bg-white rounded">
                            <div className="flex justify-center items-center ">
                                {user.image.url ? <img src={user?.image?.url} alt="" className="w-16 h-16 rounded-full ring-2"/>:
                                <span className="w-16 h-16 rounded-full ring-2"><Image src={user_image} alt="" height={64} width={64} style={{borderRadius : "50%"}}/></span>}
                            </div>
                            <div className="pl-4 text-gray-600">
                                <p className="">{user?.name}</p>
                                <p className="text-sm">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <Link href=""><a className="text-sky-700">No longer access account?</a></Link>
                            <button onClick={()=>sendForgetMail(user.email,setFinded,setChange)} className="border px-6 py-2 bg-sky-800 text-white rounded-full shadow-lg">Sent Email</button>
                        </div>
                    </div>}
                    {change && <div className="mx-3 space-y-3 ">
                        <h3 className="text-2xl font-bold text-sky-900">Confirm password</h3>
                        <p className="text-sm text-gray-500">We sent a verification code to your <span className="text-sky-500 font-bold">{user.email}</span> email address.Please check your email</p>
                        <div className="space-y-3">
                            <input type="text" onChange={(e)=>setCode(e.target.value)} className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2" placeholder="Verification code"/>
                            <input type="text" onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2" placeholder="Password"/>
                            <input type="text" onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded border-gray-300 focus:outline-none focus:ring-2" placeholder="Confirm password"/>
                            <button onClick={()=>forgetVerify(email,password,code,router)} className="w-full px-4 py-2 bg-sky-800 text-white rounded-md hover:bg-sky-900 transition-all duration-300">Submit</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}