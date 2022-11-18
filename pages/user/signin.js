import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Trying from '../../components/Trying';
import { signin } from '../../libs/AllUserAction';
import img from '../../public/image/login.png';
import { login } from '../../store/slice/authSlice';
import handleInput from '../../utils/handleInput';

export default function Signin(){
    const router = useRouter()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        email :'',
        password :'',
    })
    
    return (
        <div className='signup'>
            <Header/>
            <div className="signup_area">
                <div className="image">
                    <Image src={img} alt="Logo"/>
                </div>
                <form className="input" onSubmit={(e)=>signin(e,value,router,setLoading,dispatch,login)}>
                    <div className="login">
                        <h3>Login your account</h3>
                        <div>
                            <label htmlFor="">Email :</label>
                            <input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your email' className=''/>
                        </div>
                        <div>
                            <label htmlFor="">Password :</label>
                            <input type="password" name="password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your password' className=''/>
                        </div>
                        <div className="">
                            <input type="submit" value={loading ? "Please wait ..." : "SIGNIN"}/>
                        </div>
                        <p className='text-center'>You are not a user? <Link href="/user/signup"><a className='font bold text-blue-500'>Signup</a></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};
