import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Trying from '../../components/Trying';
import { signup } from '../../libs/AllUserAction';
import img from '../../public/image/signup.png';
import handleInput from '../../utils/handleInput';

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
        <div className='signup'>
            <Header/>
            <div className="signup_area">
                <div className="image">
                    <Image src={img} alt="signup"/>
                    {/* <Image src={img} alt="Logo"/> */}
                </div>
                <form className="input" onSubmit={(e)=>signup(e,value,router)}>
                    <div className="">
                        <h3>Create new account</h3>
                        <div>
                            <label htmlFor="">Name :</label>
                            <input type="text" name="name" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your name' className=''/>
                        </div>
                        <div>
                            <label htmlFor="">Email :</label>
                            <input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your valid email' className=''/>
                        </div>
                        <div>
                            <label htmlFor="">Number :</label>
                            <input type="text" name="number" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your number' className=''/>
                        </div>
                        <div>
                            <label htmlFor="">Password :</label>
                            <input type="text" name="password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your password' className=''/>
                        </div>
                        <div>
                            <label htmlFor="">Confirm password :</label>
                            <input type="text" name="confirm_password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='enter your confirm password' className=''/>
                        </div>
                        <div className="">
                            <input type="submit" value="SIGNUP"/>
                        </div>
                        <p className='text-center'>Already have an account? <Link href="/user/signin"><a className='font bold text-blue-500'>Signin</a></Link></p>
                        {
                            loading && <Trying text='Loging Please wait'/>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};
