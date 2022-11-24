import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const verifyAccount = async (code,router,setVerify)=>{
    try {
        setVerify(true)
        const res = await axios.post("/api/user/verify",{code},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token"),
            }
        })
        if(res.data){
            router.push("/user/signin")
            setVerify(false)
        }
    } catch (error) {
        notificationNOT(error.response.data.message)
        console.log(error.response.data)
        setVerify(false)
    }
}

export const verifyCodeAgain = async ()=>{
    try {
        const res = await axios.post("/api/user/verify_code_again",{},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token"),
            }
        })
        if(res.data){
            notificationOK(res.data.message)
        }
    } catch (error) {
        notificationNOT(error.message)
    }
}

export const sendForgetMail = async(email,setFinded,setChange) =>{
    try {
        const res = await axios.get(`/api/user/forget/${email}`)
        if(res.data.status === 200){
            console.log(res.data)
            setChange(true)
            setFinded(false)
        }
    } catch (error) {
        console.log(error)
    }
}

export const forgetVerify = async(email,password,code,router) =>{
    try {
        const res = await axios.get(`/api/user/forget_verify/${email}/${password}/${code}`)
        if(res.data.status === 200){
            router.push("/user/signin")
        }
    } catch (error) {
        console.log(error)
    }
}