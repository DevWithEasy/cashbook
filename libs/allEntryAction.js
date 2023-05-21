import axios from "axios"
import { notificationNOT, notificationOK } from "../utils/toastNotification"

export const createEntry = async(id,value,setValue,type,dispatch,action,onClose)=>{
    try {
        const res = await axios.post(`/api/entry/add`,value,{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.data){
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
        notificationNOT(err.message)
    }
}

export const createEntryOther = async(id,value,setValue,type,dispatch,action)=>{
    try {
        const res = await axios.post(`/api/entry/add`,value,{
            headers: {
                "cb-access-token": localStorage.getItem("cb_access_token")
            }
        })
        if(res.data.data){
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
        notificationNOT(err.message)
    }
}

export const deleteEntry = async(id,dispatch,action,onClose)=>{
    try {
        const res = await axios.delete(`/api/entry/${id}`)
        if(res.data.status === 200){
            notificationOK(res.data.message)
            dispatch(action(id))
            onClose()
        }
    } catch (err) {
        notificationNOT(err.message)
    }
}

export const updateEntry = async(id,value,dispatch,action,onClose)=>{
    try {
        const res = await axios.put(`/api/entry/${id}`,value)
        if(res.data.status === 200){
            notificationOK(res.data.message)
            dispatch(action(res.data.data))
            onClose()
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