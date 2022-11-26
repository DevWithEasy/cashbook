import axios from "axios";
import { signInWithPopup,linkWithPopup} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../utils/firebase";
import { notificationNOT, notificationOK } from "../utils/toastNotification";
export async function googleSignIn(router,dispatch,action) {
    try {
        signInWithPopup(auth,googleProvider)
        .then(async function(result){
            const {displayName,email,photoURL} = result.user;
            const res = await axios.post('/api/user/social/google',{name:displayName,email,url:photoURL})
            if(res.data.data){
                localStorage.setItem('cb_access_token',res.data.token)
                dispatch(action(res.data.data))
                notificationOK(res.data.message);
                router.push('/')
            }
        })
        .catch(function(error){
            console.log(error)
        });
    } catch (error) {
        console.log(error)
    }
}

export async function facebookSignIn() {
    try {
        signInWithPopup(auth,facebookProvider)
        .then(async function(result){
            console.log(result)
            // const {displayName,email,phoneNumber,photoURL} = result.user;
            // const res = await axios.post('/api/user/social/google',{name:displayName,email,number:phoneNumber,url:photoURL})
            // if(res.data.data){
            //     localStorage.setItem('cb_access_token',res.data.token)
            //     dispatch(action(res.data.data))
            //     notificationOK(res.data.message);
            //     router.push('/')
            // }
        })
        .catch(function(error){
            console.log(error)
        });
    } catch (error) {
        console.log(error)
    }
}