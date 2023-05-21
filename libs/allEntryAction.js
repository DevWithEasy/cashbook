import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createEntry = async(id,value,setValue,type,setLoading,dispatch,action,onClose)=>{
    try {
        setLoading(true)
        const res = await axios.post(`/api/entry/add`,value,{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.data){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setValue({
                book : id,
                amount : '',
                entryType : type,
                remark : '',
                history : []
            })
            onClose()
        }
    } catch (err) {
        console.log(err)
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const createEntryOther = async(id,value,setValue,type,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.post(`/api/entry/add`,value,{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.data){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            setValue({
                book : id,
                amount : '',
                entryType : type,
                remark : '',
                history : []
            })
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const deleteEntry = async(id,setLoading,dispatch,action,onClose)=>{
    try {
        setLoading(true)
        const res = await axios.delete(`/api/entry/${id}`)
        if(res.data.status === 200){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(id))
            onClose()
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}

export const updateEntry = async(id,value,setLoading,dispatch,action,onClose)=>{
    try {
        setLoading(true)
        const res = await axios.put(`/api/entry/${id}`,value)
        if(res.data.status === 200){
            setLoading(false)
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            onClose()
        }
    } catch (err) {
        setLoading(false)
        notificationNOT(err.message)
    }
}
export const entryDetails = async(id,setDetails)=>{
    try {
        const res = await axios.get(`/api/entry/${id}`)
        if(res.data.data){
            setDetails(res.data.data)
        }
    } catch (err) {
        console.log(err)
    };
}