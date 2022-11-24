import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createBook} from '../libs/allBookAction';
import { addBook } from '../store/slice/bookSlice';
import Trying from './Trying';

const AddBook = ({setAdd}) => {
    const [value,setValue] = useState("")
    const [loading,setLoading] = useState(false)
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>ADD NEW BOOK</span>
                    <span className='close' onClick={()=>setAdd(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <label htmlFor="">Book name</label>
                    <input type="text" placeholder='e.g- Daily Expense' onChange={(e)=>setValue(e.target.value)}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Wait'/>
                    }
                    <button className='in' onClick={(e)=>createBook(value,user._id,setAdd,setLoading,dispatch,addBook)}>ADD</button>
                </div>
            </div>
        </div>
    );
};

export default AddBook;