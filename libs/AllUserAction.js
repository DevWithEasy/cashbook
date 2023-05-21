import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const signup=async(e,value,router,setLoading)=>{
    e.preventDefault()
    setLoading(true)
    try{
    const res = await axios.post('/api/user/signup',value)
    if(res.data.status === 200){
        setLoading(false)
        localStorage.setItem('cb_access_token',res.data.token)
        router.push("/user/verify_account")
        notificationOK(res.data.message)
        console.log(res.data)
    }
    }catch(err){
        setLoading(false)
        notificationNOT(err.response.data.message)
        console.log(err)
    }
}

export const signin= async(e,value,router,setLoading,dispatch,action)=>{
    e.preventDefault()
    setLoading(true)
    try{
    const res = await axios.post('/api/user/',value)
    if(res.data.data){
        localStorage.setItem('cb_access_token',res.data.token)
        setLoading(false)
        dispatch(action(res.data.data))
        router.push('/')
    }
    }catch(error){
        setLoading(false)
        notificationNOT(error.response.data.message)
        console.log(error)
    }
}

export const uploadPhoto=async(e,id,file,setView,dispatch,action)=>{
    e.preventDefault()
    try {
        const formData = new FormData()
        formData.append('id',id)
        formData.append("image",file)
        const res  = await axios.post(`/api/user/upload`,formData)
        if(res.data.data){
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (err) {
        notificationNOT(err.response.data.message)
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
    } catch (error) {
        notificationNOT(error.response.data.message)
    }
}

export const findAccount = async(email,setUser,setFind,setFinded) =>{
    try {
        const res = await axios.get(`/api/user/find/${email}`)
        if(res.data.status === 200){
            setUser(res.data.data)
            setFind(true)
            setFinded(true)
        }
    } catch (error) {
        notificationNOT(error.response.data.message)
    }
}

export const deleteAccount=async(setView,router,setLoading,dispatch,logoutAction,resetAction)=>{
    try {
        setLoading(true)
        const res  = await axios.delete(`/api/user/delete_account`,{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token"),
            }
        })
        if(res.data){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(logoutAction())
            dispatch(resetAction())
            router.push("/user/signin")
            setView(false)
        }
    } catch (error) {
        setLoading(false)
        notificationNOT(error.response.data.message)
    }
}