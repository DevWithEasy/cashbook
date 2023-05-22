import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { AiOutlineSetting } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import Balance from "../../../components/Balance";
import CashIn from "../../../components/CashIn";
import CashOut from "../../../components/CashOut";
import DeleteBook from '../../../components/DeleteBook';
import Header from "../../../components/Header";
import NoData from '../../../components/NoData';
import Table from "../../../components/Table";
import UpdateBook from '../../../components/UpdateBook';
import { addEntries, currentBook } from "../../../store/slice/bookSlice";
import Head from 'next/head';
import getSingleBook from '../../../libs/getSingleBook';

export default function Books(){
    const dispatch = useDispatch()
    const router = useRouter()
    const {id} = router.query
    const book = useSelector(state=>state.book.currentBook)
    const [search,setSearch] = useState('')

    useEffect(()=>{
        if(id) {getSingleBook(id,dispatch,currentBook)}
    },[dispatch, id])
    
    return(
        <div className="book_details">
            <Header/>
            <Head>
                <title>{book?.name}-details history all entries</title>
            </Head>
            <div className="book_info">
                <h3>{book?.name}</h3>
                <Menu>
                    <MenuButton as={Button}>
                        <AiOutlineSetting size={20}/>
                    </MenuButton>
                    <MenuList p='4px'>
                        <MenuItem className='rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300'>
                            <UpdateBook/>
                        </MenuItem>
                        <MenuItem className='rounded-md hover:bg-red-500 hover:text-white transition-all duration-300'>
                            <DeleteBook/>
                        </MenuItem>
                    </MenuList>
                </Menu>

            </div>
            <div className="search">
                <div className="input">
                    <input type="search" placeholder="Search by remarks ..." onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}/>
                </div>
                <div className="entry">
                    <div className="">
                        <CashIn {...{id}}/>
                        <CashOut {...{id}}/>
                    </div>
                </div>
            </div>
            {book?.entries && <Balance entries={book?.entries}/>}
            {book?.entries?.length < 1 && <NoData/>}
            {book?.entries &&  <Table entries={book?.entries} search={search}/>}
            <Toaster/>
        </div>
    )
}