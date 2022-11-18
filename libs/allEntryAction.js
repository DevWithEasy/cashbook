import axios from "axios"

export const createEntry = async(value,setView,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.post(`/api/entry/add`,value)
        if(res.data.data){
            setLoading(false)
            dispatch(action(res.data.data))
            setView(false)
        }
    } catch (err) {
        console.log(err)
    }
}

export const createEntryOther = async(id,userId,value,setValue,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.post(`/api/entry/add`,value)
        if(res.data.data){
            setLoading(false)
            dispatch(action(res.data.data))
            setValue({
                book : id,
                user : userId,
                amount : '',
                entryType : 'Credit',
                remark : '',
                history : []
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const deleteEntry = async(id,setShow,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.delete(`/api/entry/${id}`)
        if(res.data.status === 200){
            setLoading(false)
            dispatch(action(id))
            setShow(false)
        }
    } catch (err) {
        console.log(err)
    }
}

export const updateEntry = async(id,value,setShow,setLoading,dispatch,action)=>{
    try {
        setLoading(true)
        const res = await axios.put(`/api/entry/${id}`,value)
        if(res.data.status === 200){
            setLoading(false)
            dispatch(action(res.data.data))
            setShow(false)
        }
        console.log(res.data)
    } catch (err) {
        console.log(err)
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