import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import Balance from "../../../components/Balance";
import CashIn from "../../../components/CashIn";
import CashOut from "../../../components/CashOut";
import DeleteBook from '../../../components/DeleteBook';
import DeleteEntry from "../../../components/DeleteEntry";
import Header from "../../../components/Header";
import NoData from '../../../components/NoData';
import Table from "../../../components/Table";
import UpdateBook from '../../../components/UpdateBook';
import UpdateEntry from "../../../components/UpdateEntry";
import getAllEntry from "../../../libs/getAllEntry";
import getSingleBook from "../../../libs/getSingleBook";
import { addEntries, currentBook } from "../../../store/slice/bookSlice";
import { useDisclosure } from '@chakra-ui/react';

export default function Books(){
    const [setting,setSetting] = useState(false)
    const [update,setUpdate] = useState(false)
    const [remove,setRemove] = useState(false)
    const [deleteId,setDeleteId] = useState("")
    const [updateId,setUpdateId] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    const allEntries = useSelector(state=>state.book.entries)
    const book = useSelector(state=>state.book.currentBook)

    useEffect(()=>{
        getSingleBook(id,dispatch,currentBook)
        getAllEntry(id,dispatch,addEntries)
    },[dispatch,id])
    return(
        <div className="book_details">
            <Header/>
            <div className="book_info">
                <h3>{book?.name}</h3>
                <div className="">
                    <button onClick={()=>setSetting(!setting)}>
                        <AiOutlineSetting size={20}/>
                    </button>
                </div>
                {
                    setting && <div className="setting">
                        <UpdateBook/>
                        <DeleteBook/>
                    </div>
                }
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
            <Balance entries={allEntries}/>
            {allEntries.length === 0 ? <NoData/> : <Table entries={allEntries} setUpdateId={setUpdateId} setDeleteId={setDeleteId} setUpdate={setUpdate} setRemove={setRemove}/>}
            <Toaster/>
        </div>
    )
}