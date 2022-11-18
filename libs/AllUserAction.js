import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const signup=async(e,value,router)=>{
    e.preventDefault()
    try{
    const res = await axios.post('/api/user/signup',value)
    if(res.data.status === 200){
        router.push("/user/signin")
    }
    }catch(err){
        notificationNOT(err.message)
    }
}

export const signin= async(e,value,router,setLoading,dispatch,action)=>{
    e.preventDefault()
    setLoading(true)
    try{
    const res = await axios.post('/api/user/',value)
    if(res.data.data){
        setLoading(false)
        dispatch(action(res.data.data))
        router.push('/')
    }
    }catch(error){
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const uploadPhoto=async(e,id,file,setView,setLoading,dispatch,action)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const formData = new FormData()
        formData.append('id',id)
        formData.append("image",file)
        const res  = await axios.post(`/api/user/upload`,formData)
        if(res.data.data){
            notificationOK(res.data.message)
            setLoading(false)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (err) {
        notificationNOT(err.message)
    }
}
export const updateProfile=async(e,value,setView,setLoading,dispatch,action)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const res  = await axios.put(`/api/user`,value)
        if(res.data.data){
            notificationOK(res.data.message)
            setLoading(false)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (err) {
        notificationNOT(err.message)
    }
}