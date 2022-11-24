import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Trying from '../../components/Trying';
import { signin } from '../../libs/AllUserAction';
import { login } from '../../store/slice/authSlice';
import handleSigninInput from '../../utils/handleSigninInput';
import {FcGoogle} from 'react-icons/fc';
import {BsFacebook} from 'react-icons/bs';
import {MdOutlineEmail,MdOutlineRemoveRedEye} from 'react-icons/md';
import img from '../../public/image/login.png';
import { Toaster } from 'react-hot-toast';

export default function Signin(){
    const router = useRouter()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({
        email :'',
        password :'',
    })
    const [value,setValue] = useState({
        email :'',
        password :'',
    })
    
    return (
        <div className='signup relative min-h-screen pt-16 pb-4 bg-gray-300'>
            <Header/>
            <div className="signup_area w-11/12 mx-auto flex justify-between bg-gray-100 rounded-md p-2">
                <div className="image hidden w-1/2 bg-blue-300 rounded-md md:flex justify-center items-center">
                    <Image src={img} width='300' height='300' alt="signup"/>
                </div>
                <div className="w-full md:w-1/2">
                    <form className="input p-4" onSubmit={(e)=>signin(e,value,router,setLoading,dispatch,login)}>
                    <div className="login space-y-3">
                        <h3 className='text-2xl text-sky-900 font-bold'>Login</h3>
                        <p className='text-gray-500 text-sm'>Are you already a member,easily log in.</p>
                        <div className='relative'>
                            <input type="email" name="email" onChange={(e)=>handleSigninInput(e,value,setValue,error,setError)} placeholder='Email' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2' required/>
                            <span className='absolute -translate-x-7 translate-y-3 text-gray-300'><MdOutlineEmail size={20}/></span>
                            {error.email && <p className='text-red-500'>{error.email}</p>}
                        </div>
                        <div className='relative'>
                            <input type="password" name="password" onChange={(e)=>handleSigninInput(e,value,setValue,error,setError)} placeholder='Password' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2' required/>
                            <span className='absolute -translate-x-7 translate-y-3 text-gray-300'><MdOutlineRemoveRedEye size={20}/></span>
                            {error.password && <p className='text-red-500'>{error.password}</p>}
                        </div>
                        <div className="">
                            <input type="submit" value={loading ? "Please wait ..." : "SIGN IN"} className='w-full bg-sky-800 text-white p-2 rounded-md font-bold hover:bg-sky-900 cursor-pointer transition-all duration-300'/>
                        </div>                       
                    </div>
                    </form>
                    <div className="px-4 space-y-2">
                        <div className="grid grid-cols-3 items-center">
                            <hr className='border-gray-500'/>
                            <p className='text-center text-gray-500'>OR</p>
                            <hr className='border-gray-500'/>
                        </div>
                        <div className="space-y-2 pt-2">
                            <button className='w-full flex justify-center items-center space-x-3 bg-slate-300 p-2 rounded-md hover:bg-slate-400 hover:text-white transition-all duration-300'>
                                <FcGoogle/>
                                <span>Sign in with Google</span>
                            </button>
                            <button className='w-full flex justify-center items-center space-x-3 bg-slate-300 p-2 rounded-md hover:bg-slate-400 hover:text-white transition-all duration-300'>
                                <BsFacebook/>
                                <span>Sign in with Facebook</span>
                            </button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-500">
                            <Link href="/user/forget"><a className='py-2 inline-block'>Forget your password ?</a></Link>
                            <hr className='border-gray-400'/>
                            <div className='flex justify-between items-center'>You are have not an account? <Link href="/user/signup"><a className='border px-4 py-2 bg-white text-sky-800 font-semibold border-slate-400 rounded-md'>Signup</a></Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};
