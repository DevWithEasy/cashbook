import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEntry } from '../libs/allEntryAction';
import { updatePrevEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';

const EditEntry = ({updateId,setUpdate}) => {
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        amount : updateId.amount,
        entryType : updateId.entryType,
        remark : updateId.remark,
        reason : ""
    })

    return (
        <div className='add_new'>
            <div className="">
                <h3>
                    <span>UPDATE ENTRY</span>
                    <span className='close' onClick={()=>setUpdate(false)}>X</span>
                </h3>
                <hr />
                <div className="input">
                    <label htmlFor="">Amount</label>
                    <input type="number" name="amount" value={value.amount} onChange={(e)=>handleInput(e,value,setValue)}/>
                    <label htmlFor="">Type</label>
                    <select name="entryType" id="" onChange={(e)=>handleInput(e,value,setValue)}>
                        <option value={value.entryType}>{value.entryType}</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                    <label htmlFor="">Remarks</label>
                    <input type="text" name="remark" value={value.remark} onChange={(e)=>handleInput(e,value,setValue)}/>
                    <label htmlFor="">Reason</label>
                    <input type="text" name="reason" placeholder='Change reason' onChange={(e)=>handleInput(e,value,setValue)}/>
                </div>
                <hr />
                <div className="submit">
                    {
                        loading && <Trying text='Updating'/>
                    }
                    <button className='in' onClick={()=>updateEntry(updateId._id,value,setUpdate,setLoading,dispatch,updatePrevEntry)}>UPDATE</button>
                </div>
            </div>
        </div>
    );
};

export default EditEntry;