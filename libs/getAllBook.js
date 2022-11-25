import axios from "axios"

const getAllBook =async(id,dispath,action)=>{
    try{
      const res = await axios.get(`/api/book/all/${id}`)
      if(res.data.data){
        dispath(action(res.data.data))
      }
    }catch(err){
      console.log(err.message)
    }
}
export default getAllBook;