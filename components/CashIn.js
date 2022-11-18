import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEntry, createEntryOther } from '../libs/allEntryAction';
import { addEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';

const CashIn = ({id,setAdd}) => {
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        book : id,
        user : user._id,
        amount : '',
        entryType : 'Credit',
        remark : '',
        history : []
    })
    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>ADD NEW ENTRY</span>
                    <span className='close' onClick={()=>setAdd(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" placeholder='e.g- 100' value={value.amount} onChange={(e)=>handleInput(e,value,setValue)}/>
                    <label htmlFor="">Remarks</label>
                    <input type="text" name="remark" placeholder='e.g- Salary' value={value.remark} onChange={(e)=>handleInput(e,value,setValue)}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Creating'/>
                    }
                    <button className='in' onClick={()=>createEntryOther(id,user._id,value,setValue,"Credit",setLoading,dispatch,addEntry)}>ADD & MORE</button>
                    <button className='in' onClick={()=>createEntry(value,setAdd,setLoading,dispatch,addEntry)}>ADD</button>
                </div>
            </div>
        </div>
    );
};

export default CashIn;