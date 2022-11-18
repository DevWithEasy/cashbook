import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createEntry = async(value,setView,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.post(`/api/entry/add`,value)
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

export const createEntryOther = async(id,userId,value,setValue,type,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.post(`/api/entry/add`,value)
        if(res.data.data){
            notificationOK(res.data.message)
            setLoading(false)
            dispatch(action(res.data.data))
            setValue({})
            setValue({
                book : id,
                user : userId,
                amount : '',
                entryType : type,
                remark : '',
                history : []
            })
        }
    } catch (err) {
        notificationNOT(err.message)
    }
}

export const deleteEntry = async(id,setShow,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.delete(`/api/entry/${id}`)
        if(res.data.status === 200){
            notificationOK(res.data.message)
            setLoading(false)
            dispatch(action(id))
            setShow(false)
        }
    } catch (err) {
        notificationNOT(err.message)
    }
}

export const updateEntry = async(id,value,setShow,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.put(`/api/entry/${id}`,value)
        if(res.data.status === 200){
            notificationOK(res.data.message)
            setLoading(false)
            dispatch(action(res.data.data))
            setShow(false)
        }
    } catch (err) {
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