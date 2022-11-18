import axios from "axios"

const getAllEntry =async(id,dispath,action)=>{
    try{
      const res = await axios.get(`/api/entry/all/${id}`)
      if(res.data.data){
        // setEntries(res.data.data)
        dispath(action(res.data.data))
      }
    }catch(err){
      console.log(err)
    }
}
export default getAllEntry;