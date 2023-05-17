import Link from 'next/link';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Balance from './Balance';
import EditEntry from './UpdateEntry';
import DeleteEntry from './DeleteEntry';

const Table = ({entries,setUpdateId,setDeleteId,setUpdate,setRemove}) => {
    const action = (id,setId,setView)=>{
        setId(id);
        setView(true);
    }
    // const credit = entries.filter(e=>e.entryType === "Credit").reduce((a,i)=>a+parseInt(i.amount),0)
    // const debit = entries.filter(e=>e.entryType === "Debit").reduce((a,i)=>a+parseInt(i.amount),0)
    // const balance = credit - debit
    // const newarray = entries.map(entry=>{
    //     if(entry.entryType === "Credit"){
    //         let equal = 0
    //         const credit = entries.filter(e=>e.entryType === "Credit").reduce((a,i)=>a+parseInt(i.amount),0)
    //         equal = credit + entry.amount
    //         return {...entry,balance: equal}
    //     }else{
    //         return {...entry,balance: credit-entry.amount}
    //     }
    // });
    // console.log(newarray)
    return (
        <div className="entry_list">
            <div className="space-y-2 pb-4">
                {
                    entries.map(entry=><div key={entry._id} className='border rounded bg-white'>
                        <div className='realtive flex justify-between items-center bg-gray-300 px-2 py-1'>
                            <span>{new Date(entry.createdAt).toDateString()}</span>
                            <div className="flex items-center space-x-4">
                                <EditEntry {...{entry}}/>
                                <DeleteEntry {...{entry}}/>
                            </div>
                        </div>
                        <Link href={`/entry/details/${entry._id}`}>
                            <a>
                            <div className="flex justify-between p-2">
                            <p className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
                                {entry.entryType === "Credit" ? <span className='px-1 sm:px-4 bg-green-500 text-white rounded text-center'>{entry.entryType}</span> : <span className='px-1 sm:px-4 bg-red-500 text-white rounded text-center'>{entry.entryType}</span>}
                                <span>{entry.remark}</span>
                            </p>
                            <p className='flex justify-center items-center'>
                                {entry.entryType==="Credit" ? <span className='font-semibold'>{entry.amount}/-</span> : <span className='text-red-500 font-semibold'>{entry.amount}/-</span>}
                            </p>
                        </div>
                            </a>
                        </Link>
                        <p className='flex justify-between border-t text-xs px-2 py-1'>
                            <span>This entry created at {new Date(entry.createdAt).toLocaleTimeString()}</span>
                            {/* <span>Balance : 1200/-</span> */}
                        </p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Table;