import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../libs/AllUserAction';
import { login } from '../store/slice/authSlice';
import Trying from './Trying';

const UpdateProfilePhoto = ({setUpdatePhoto,handleFile,file,image}) => {
    const user = useSelector(state=> state.auth.user)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>UPDATE PHOTO</span>
                    <span className='close' onClick={()=>setUpdatePhoto(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <div className="image">
                        <img src={image} alt=""/>
                    </div>
                    <label htmlFor="number">Choose a photo :</label>
                    <input type="file" onChange={(e)=>handleFile(e)}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Uploading'/>
                    }
                    <button className='in' onClick={(e)=>uploadPhoto(e,user._id,file,setUpdatePhoto,setLoading,dispatch,login)}>UPDATE</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePhoto;