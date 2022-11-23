import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Trying from '../../components/Trying';
import { signup } from '../../libs/AllUserAction';
import img from '../../public/image/signup.png';
import handleInput from '../../utils/handleInput';
import {FcGoogle} from 'react-icons/fc';
import {BsFacebook} from 'react-icons/bs';
import {MdOutlineEmail,MdOutlineRemoveRedEye} from 'react-icons/md';

export default function Signup(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        name :'',
        email :'',
        number :'',
        password :'',
        confirm_password :'',
        image :{
            public_id : '',
            url :'',
        }
    })
    return (
        <div className='signup relative min-h-screen pt-16 pb-4 bg-gray-300'>
            <Header/>
            <div className="signup_area w-11/12 mx-auto flex justify-between bg-gray-100 rounded-md p-2">
                <div className="image hidden w-1/2 bg-blue-300 rounded-md md:flex justify-center items-center">
                    <Image src={img} width='300' height='300' alt="signup"/>
                </div>
                <div className="w-full md:w-1/2">
                    <form className="input p-4" onSubmit={(e)=>signup(e,value,router)}>
                        <div className="space-y-3">
                            <h3 className='text-2xl text-sky-900 font-bold'>Create New Account</h3>
                            <p className='text-gray-500 text-sm'>Are you not    a member,easily sign up.</p>
                            <div className='relative'>
                                <input type="text" name="name" onChange={(e)=>handleInput(e,value,setValue)} placeholder='Name' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2'/>
                            </div>
                            <div className='relative'>
                                <input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} placeholder='Email' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2'/>

                                <span className='absolute -translate-x-7 translate-y-3 text-gray-300'><MdOutlineEmail size={20}/></span>
                            </div>
                            <div className='relative'>
                                <input type="text" name="number" onChange={(e)=>handleInput(e,value,setValue)} placeholder='Mobile number' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2'/>
                            </div>
                            <div className='relative'>
                                <input type="text" name="password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='Password' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2'/>

                                <span className='absolute -translate-x-7 translate-y-3 text-gray-300'><MdOutlineRemoveRedEye size={20}/></span>
                            </div>
                            <div className='relative'>
                                <input type="text" name="confirm_password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='Confirm password' className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2'/>

                                <span className='absolute -translate-x-7 translate-y-3 text-gray-300'><MdOutlineRemoveRedEye size={20}/></span>
                            </div>
                            <div className="">
                                <input type="submit" value={loading ? "Please wait ..." : "SIGNUP"} className='w-full bg-sky-800 text-white p-2 rounded-md font-bold hover:bg-sky-900 cursor-pointer transition-all duration-300'/>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <hr className='border-gray-500'/>
                                <p className='text-center text-gray-500'>OR</p>
                                <hr className='border-gray-500'/>
                            </div>
                            <div className="space-y-2">
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
                            <div className='flex justify-between items-center'>You are have an account? <Link href="/user/signin"><a className='border px-4 py-2 bg-white text-sky-800 font-semibold border-slate-400 rounded-md'>Signin</a></Link></div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
