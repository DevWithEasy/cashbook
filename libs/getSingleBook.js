import axios from "axios"

const getSingleBook =async(id,dispath,action)=>{
    try{
      const res = await axios.get(`/api/book/${id}`)
      if(res.data.data){
        dispath(action(res.data.data))
      }
    }catch(err){
      console.log(err)
    }
}
export default getSingleBook;