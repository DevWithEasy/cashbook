import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../libs/AllUserAction';
import { login } from '../store/slice/authSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';

const UpdateProfile = ({setUpdate}) => {
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        name : user.name,
        email : user.email,
        number : user.number
    })
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>UPDATE ACCOUNT</span>
                    <span className='close' onClick={()=>setUpdate(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" onChange={(e)=>handleInput(e,value,setValue)} value={value.name}/>

                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} value={value.email}/>

                    <label htmlFor="number">Number :</label>
                    <input type="number" name="number" onChange={(e)=>handleInput(e,value,setValue)} value={value.number}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Updating'/>
                    }
                    <button className='in' onClick={(e)=>updateProfile(e,value,setUpdate,setLoading,dispatch,login)}>UPDATE</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;