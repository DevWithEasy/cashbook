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
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
  } from '@chakra-ui/react'
const Header = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(state=> state.auth.user)
    const userLogout = ()=>{
        dispatch(logout())
        dispatch(logoutReset())
        router.push('/')
        localStorage.removeItem('cb_access_token')
    }
    return (
        <div className='header_main'>
            <div className="header">
                <Link href='/'><a>CASHBOOK</a></Link>
                <Menu>
                    <MenuButton className='border h-10 w-10 rounded-full'>
                        {!user.image && <AiOutlineUserAdd/>}
                        {user.image && <img src={user?.image?.url} alt="profile" className='rounded-full'/>}
                    </MenuButton>
                    <MenuList p='4px'>
                        {!user.email && <MenuItem  className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <Link href='/user/signup'>
                                <a className='flex items-center space-x-2'>
                                    <AiOutlineUserAdd/>
                                    <span>Sign up</span>
                                </a>
                            </Link>
                        </MenuItem>}
                        {!user.email && <MenuItem className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <Link href='/user/signin'>
                                <a className='flex items-center space-x-2'>
                                    <AiOutlineLogin/>
                                    <span>Sign in</span>
                                </a>
                            </Link>
                        </MenuItem>}
                        {user.name && <MenuItem  className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <Link href='/user/profile'>
                                <a className='flex items-center space-x-2'>
                                    <BiUserCircle/>
                                    <span>Account</span>
                                </a>
                            </Link>
                        </MenuItem>}
                        <MenuItem className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <Link href='/'>
                                <a className='flex items-center space-x-2'>
                                    <BsBook/>
                                    <span>All Books</span>
                                </a>
                            </Link>
                        </MenuItem>
                        <MenuItem  className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <Link href='/settings'>
                                <a className='flex items-center space-x-2'>
                                    <AiOutlineSetting/>
                                    <span>Settings</span>
                                </a>
                            </Link>
                        </MenuItem>
                        <MenuItem className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <Link href='/abouts'>
                                <a className='flex items-center space-x-2'>
                                    <AiOutlineInfoCircle/>
                                    <span>Abouts</span>
                                </a>
                            </Link>
                        </MenuItem>
                        {user.name && <MenuItem className='rounded-md hover:bg-red-500 hover:text-white transition-all duration-300'>
                            <button onClick={()=>userLogout()} className='flex items-center space-x-2'>
                                <BiLogOutCircle/>
                                <span>Logout</span>
                            </button>
                        </MenuItem>}
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default Header;