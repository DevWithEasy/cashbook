import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createBook =async(name,setLoading,dispatch,action,onClose)=>{
    try{
        setLoading(true)
        const res = await axios.post('/api/book/add',{name},{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.status === 200){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            onClose()
        }
    }catch(err){
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateBook =async(id,value,setLoading,dispatch,action,onClose)=>{
    try{
        setLoading(true)
        const res = await axios.put(`/api/book/${id}`,{name : value})
        if(res.data.status === 200){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data.name))
            onClose()
        }
    }catch(err){
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const deleteBook =async(id,router,setLoading,dispatch,action)=>{
    try{
        setLoading(true)
        const res = await axios.delete(`/api/book/${id}`)
        if(res.data.status === 200){
            setLoading(false)
            router.push("/")
            dispatch(action(res.data.data.id))
        }
    }catch(err){
        setLoading(false)
        notificationNOT(err.message)
    }
}