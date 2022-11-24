import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Index(){
  const router = useRouter()
  const user = useSelector(state=> state.auth.user)
  if (user.email) {
    if(!user.isVerified){
      router.push("/user/verify_account")
    }else{
      router.push("/books")
    }
  }else{
    router.push('/user/signin')
  }
}