import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiUserCircle,BiLogOutCircle } from 'react-icons/bi';
import {BsBook} from 'react-icons/bs';
import {AiOutlineUserAdd,AiOutlineLogin,AiOutlineSetting,AiOutlineInfoCircle} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout } from '../store/slice/authSlice';
import { logoutReset } from '../store/slice/bookSlice';
import { useRouter } from 'next/router';
const Header = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(state=> state.auth.user)
    const [account,setAccount] = useState(false)
    const userLogout = ()=>{
        dispatch(logout())
        dispatch(logoutReset())
        router.push('/')
    }
    return (
        <div className='header_main'>
            <div className="header">
                <Link href='/'><a>CASHBOOK</a></Link>
                <div className="icon">
                    <button onClick={()=>setAccount(!account)}>
                        {!user.image && <AiOutlineUserAdd/>}
                        {user.image && <img src={user?.image?.url} alt="profile"/>}
                    </button>
                </div>
               {
                account &&  <div className="link">
                
                {
                    !user.email && <Link href='/user/signup'>
                        <a>
                            <AiOutlineUserAdd/>
                            <span>Sign up</span>
                        </a>
                    </Link>
                }

                {
                    !user.email && <Link href='/user/signin'>
                        <a>
                            <AiOutlineLogin/>
                            <span>Sign in</span>
                        </a>
                    </Link>
                }

                {
                    user.name && <Link href='/user/profile'>
                        <a>
                            <BiUserCircle/>
                            <span>Account</span>
                        </a>
                    </Link>
                }

                <Link href='/'>
                    <a>
                        <BsBook/>
                        <span>All Books</span>
                    </a>
                </Link>
                <Link href='/settings'>
                    <a>
                        <AiOutlineSetting/>
                        <span>Settings</span>
                    </a>
                </Link>
                <Link href='/abouts'>
                    <a>
                        <AiOutlineInfoCircle/>
                        <span>Abouts</span>
                    </a>
                </Link>
                
                {
                    user.name && <button onClick={()=>userLogout()}>
                            <BiLogOutCircle/>
                            <span>Logout</span>
                    </button>
                }

            </div>
               }
            </div>
        </div>
    );
};

export default Header;