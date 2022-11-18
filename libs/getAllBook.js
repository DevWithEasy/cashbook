import axios from "axios"

const getAllBook =async(id,setBooks,dispath,action)=>{
    try{
      const res = await axios.get(`/api/book/all/${id}`)
      if(res.data.data){
        setBooks(res.data.data)
        dispath(action(res.data.data))
      }
    }catch(err){
      console.log(err)
    }
}
export default getAllBook;