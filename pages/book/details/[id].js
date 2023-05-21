import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from "react";
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

export const getServerSideProps = async (context) => {
    const {id} = context.params;
    const res = await fetch(`http://localhost:3000/api/book/${id}`);
    const {data} = await res.json();
    return { props: { data } };
};

export default function Books({data}){
    const dispatch = useDispatch()
    const router = useRouter()
    const book = useSelector(state=>state.book.currentBook)
    
    function addBook(){
        dispatch(currentBook(data))
    }

    useEffect(()=>{
        addBook()
    },[])
    
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
                    <input type="search" placeholder="Search by remarks ..."/>
                </div>
                <div className="entry">
                    <div className="">
                        <CashIn/>
                        <CashOut/>
                    </div>
                </div>
            </div>
            <Balance entries={book?.entries}/>
            {book?.entries.length === 0 ? <NoData/> : <Table entries={book?.entries} />}
            <Toaster/>
        </div>
    )
}