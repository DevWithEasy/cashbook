import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../libs/allBookAction';
import { removeBook } from '../store/slice/bookSlice';
import Trying from './Trying';


const DeleteBook = ({id,setRemoveBook}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading,setLoading] = useState(false)
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>ARE YOU SURE ?</span>
                    <span className='close' onClick={()=>setRemoveBook(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                   This book will be delete parmanently.you cannot back this item again.
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Deleting'/>
                    }
                    <button className='cancel' onClick={()=>setRemoveBook(false)}>CANCEL</button>
                    <button className='delete' onClick={()=>deleteBook(id,router,setLoading,dispatch,removeBook)}>DELETE</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBook;