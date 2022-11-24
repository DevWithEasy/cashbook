import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEntry } from '../libs/allEntryAction';
import { removeEntry } from '../store/slice/bookSlice';
import Trying from './Trying';

const DeleteEntry = ({deleteId,setRemove}) => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>ARE YOU SURE ?</span>
                    <span className='close' onClick={()=>setRemove(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                   This entry will be delete parmanently.you cannot back this item again.
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Deleting'/>
                    }
                    <button className='cancel hidden sm:block' onClick={()=>setRemove(false)}>CANCEL</button>
                    <button className='delete' onClick={()=>deleteEntry(deleteId,setRemove,setLoading,dispatch,removeEntry)}>DELETE</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteEntry;