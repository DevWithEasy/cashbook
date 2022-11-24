import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/Header";
import { verifyAccount, verifyCodeAgain } from "../../libs/verifyAccount";
import { Toaster } from 'react-hot-toast';
import Image from "next/image";
import img from "../../public/image/verification.png"


export default function AccountVerification(){
    const [verify,setVerify] = useState(false)
    const router = useRouter();
    const [code,setCode] = useState("")
    return (
        <div className="relative pt-16 pb-4 min-h-screen bg-gray-300 flex justify-center">
            <Header/>
            <div className="w-11/12 mx-auto flex justify-between bg-gray-100 rounded-md p-2">
                <div className="image hidden w-1/2 bg-blue-300 rounded-md md:flex justify-center items-center">
                    <Image src={img} width='300' height='300' alt="verification"/>
                </div>
                <div className="w-full md:w-1/2 p-4 flex items-center">
                    <div className="w-full space-y-3">
                        <h3 className="text-2xl font-bold text-sky-800">Verify account</h3>
                        <p className="text-sm text-gray-400">We sent a verification code to you email adress</p>
                        <div className="space-y-3">
                            <input type="text" onChange={(e)=>setCode(e.target.value)} className="p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 placeholder:text-gray-300 rounded" placeholder="Verification code"/>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={()=>verifyAccount(code,router,setVerify)} className={code.length >4  ?"bg-sky-800 hover:bg-sky-900 text-white px-6 py-2 rounded-full cursor-pointer shadow-lg":"bg-gray-200 text-gray-500 px-6 py-2 rounded-full cursor-not-allowed shadow-lg"}>
                                {!verify ? 'Verify' : 'Verifying ...'}
                            </button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-600">You have not a code ?  </span>
                            <button onClick={()=>verifyCodeAgain()} className="bg-gray-50 p-2 rounded text-sky-800 font-bold text-sm">Send Again</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}