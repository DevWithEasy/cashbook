import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createBook =async(name,dispatch,action,onClose)=>{
    try{
        const res = await axios.post('/api/book/add',{name},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.status === 200){
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            onClose()
        }
    }catch(err){
        notificationNOT(err.message)
    }
}

export const updateBook =async(id,value,dispatch,action,onClose)=>{
    try{
        const res = await axios.put(`/api/book/${id}`,{name : value})
        if(res.data.status === 200){
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            onClose()
        }
    }catch(err){
        notificationNOT(err.message)
    }
}

export const deleteBook =async(id,router,dispatch,action)=>{
    try{
        const res = await axios.delete(`/api/book/${id}`)
        if(res.data.status === 200){
            dispatch(action(res.data.data.id))
            router.push("/")
        }
    }catch(err){
        notificationNOT(err.message)
    }
}