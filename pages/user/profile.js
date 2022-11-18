import axios from "axios";
import {AiOutlineCamera} from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import UpdateProfile from "../../components/UpdateProfile";
import { login } from "../../store/slice/authSlice";
import UpdateProfilePhoto from "../../components/UpdateProfilePhoto";
import handleInput from "../../utils/handleInput";
import Trying from "../../components/Trying";

export default function Profile(){
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const [update,setUpdate] = useState(false)
    const [updatePhoto,setUpdatePhoto] = useState(false)
    const [image,setImage] = useState(null)
    const [file,setFile] = useState(null)
    const [password,setPassword] = useState({
        email : user.email,
        oldPassword : '',
        newPassword : ''
    })
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    
    return(
        <div className="profile">
            <Header/>
            <div className="info">
                <div className="profile_image">
                    <img src={user?.image?.url} alt=""/>
                    <button><AiOutlineCamera size={20} onClick={()=>setUpdatePhoto(true)}/></button>
                </div>
                <div className="profile_text">
                    <p className="name">{user?.name}</p>
                    <p className="contact">
                        <span className="font-semibold">Email Address :</span>
                        <span>{user?.email}</span>
                    </p>
                    <p className="contact">
                        <span className="font-semibold">Mobile Number :</span>
                        <span>{user?.number}</span>
                    </p>
                    <button onClick={()=>setUpdate(true)}>Update profile</button>
                </div>
                <div className="change_password">
                    <h3>Change Password</h3>
                    <div className="">
                        <input type="email" className="input" value={user.email} readOnly/>
                        <input type="text" name="oldPassword" className="input" onChange={(e=>handleInput(e,password,setPassword))} placeholder="enter your old password"/>
                        <input type="text" name="newPassword" className="input" onChange={(e=>handleInput(e,password,setPassword))} placeholder="enter your new password"/>
                        <input type="submit" value="Change Password"/>
                    </div>
                </div>
            </div>
            {
                update && <UpdateProfile setUpdate={setUpdate}/>
            }
            {
                updatePhoto && <UpdateProfilePhoto setUpdatePhoto={setUpdatePhoto} handleFile={handleFile} file={file} image={image} />
            }
        </div>
    )
}