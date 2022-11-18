import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEntry, createEntryOther } from '../libs/allEntryAction';
import { addEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';

const CashOut = ({id,setOut}) => {
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        book : id,
        user : user._id,
        amount : '',
        entryType : 'Debit',
        remark : '',
        history : []
    })
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>ADD NEW ENTRY</span>
                    <span className='close' onClick={()=>setOut(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <label htmlFor="">Amount</label>
                    <input type="number" name="amount" placeholder='e.g- 100' onChange={(e)=>handleInput(e,value,setValue)}/>
                    <label htmlFor="">Remarks</label>
                    <input type="text" name="remark" placeholder='e.g- Rent Bus' onChange={(e)=>handleInput(e,value,setValue)}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Creating'/>
                    }
                    <button className='out' onClick={()=>createEntryOther(id,user._id,value,setValue,setLoading,dispatch,addEntry)}>ADD & MORE</button>
                    <button className='out' onClick={()=>createEntry(value,setOut,setLoading,dispatch,addEntry)}>ADD</button>
                </div>
            </div>
        </div>
    );
};

export default CashOut;