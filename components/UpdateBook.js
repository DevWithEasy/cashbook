import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook} from '../libs/allBookAction';
import { renameBook } from '../store/slice/bookSlice';
import updateNotification from '../utils/toastNotification';
import Trying from './Trying';

const UpdateBook = ({id,setUpdateBook}) => {
    const book = useSelector(state=> state.book.currentBook)
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState(book.name)
    const dispatch = useDispatch()
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>UPDATE BOOK</span>
                    <span className='close' onClick={()=>setUpdateBook(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <label htmlFor="">Book name</label>
                    <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Updating'/>
                    }
                    <button className='in' onClick={(e)=>updateBook(book._id,value,setUpdateBook,setLoading,dispatch,renameBook)}>UPDATE</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;