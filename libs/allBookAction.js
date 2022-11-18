import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createBook =async(value,id,setAdd,setLoading,dispatch,action)=>{
    try{
        setLoading(true)
        const res = await axios.post('/api/book/add',{name: value,user:id})
        if(res.data.status === 200){
            notificationOK(res.data.message)
            setLoading(false)
            setAdd(false)
            dispatch(action(res.data.data))
        }
    }catch(err){
        notificationNOT(err.message)
    }
}

export const updateBook =async(id,value,setView,setLoading,dispatch,action)=>{
    try{
        setLoading(true)
        const res = await axios.put(`/api/book/${id}`,{name : value})
        if(res.data.status === 200){
            notificationOK(res.data.message)
            setLoading(false)
            dispatch(action(res.data.data))
            setView(false)
        }
    }catch(err){
        notificationNOT(err.message)
    }
}

export const deleteBook =async(id,router,setLoading,dispatch,action)=>{
    try{
        setLoading(true)
        const res = await axios.delete(`/api/book/${id}`)
        if(res.data.status === 200){
            setLoading(false)
            dispatch(action(res.data.data.id))
            router.push("/")
        }
    }catch(err){
        notificationNOT(err.message)
    }
}