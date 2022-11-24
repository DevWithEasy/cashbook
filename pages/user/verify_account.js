import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/Header";
import { verifyAccount, verifyCodeAgain } from "../../libs/verifyAccount";


export default function AccountVerification(){
    const router = useRouter();
    const [code,setCode] = useState("")
    return (
        <div className="relative pt-16 min-h-screen bg-gray-300 flex justify-center items-center">
            <Header/>
            <div className="bg-gray-100 rounded mx-4 md:w-6/12 pb-6">
                <h1 className="text-2xl text-center p-2 font-bold text-blue-500">Verify account</h1>
                <hr />
                <div className="p-2 space-y-3">
                    <label htmlFor="">Verification code:</label>
                    <input type="text" onChange={(e)=>setCode(e.target.value)} className="p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 placeholder:text-gray-300 rounded" placeholder="Verification code"/>
                </div>
                <div className="flex justify-center p-2">
                    <button onClick={()=>verifyAccount(code,router)} className={code.length >4  ?"bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer":"bg-gray-200 text-gray-500 px-6 py-2 rounded cursor-not-allowed"}>Verify</button>
                </div>
                <div className="p-2 text-center">
                    You have not a code ?  <button onClick={()=>verifyCodeAgain()} className="text-blue-500">Send Again</button>
                </div>
            </div>
        </div>
    )
}