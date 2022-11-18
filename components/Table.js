import Link from 'next/link';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Table = ({entries,setUpdateId,setDeleteId,setUpdate,setRemove}) => {
    const action = (id,setId,setView)=>{
        setId(id);
        setView(true);
    }
    return (
        <div className="entry_list">
            <div className="space-y-2">
                {
                    entries.map(entry=><div key={entry._id} className='border rounded'>
                        <div className='realtive flex justify-between items-center bg-gray-200 px-2 py-1'>
                            <span>{new Date(entry.createdAt).toDateString()}</span>
                            <div className="flex items-center space-x-4">
                                <AiOutlineEdit className='text-blue-500 cursor-pointer' size={20} onClick={()=>action(entry,setUpdateId,setUpdate)}/>
                                <AiOutlineDelete className='text-red-500 cursor-pointer' size={20} onClick={()=>action(entry._id,setDeleteId,setRemove)}/>
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
                            <span>Balance : 1200/-</span>
                        </p>
                    </div>)
                }
            </div>
        </div>
        // <table>
        //     <thead>
        //         <tr>
        //             <td>Date</td>
        //             <td>Type</td>
        //             <td>Amount</td>
        //             <td>Remarks</td>
        //             <td>Actions</td>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {
        //             entries.length>0 && entries.map((entry) =><tr key={entry._id}>
        //             <td>{new Date(entry.createdAt).toDateString()}</td>
        //             <td>{entry.entryType === "Credit" ? <span className='text-green-500'>{entry.entryType}</span> : <span className='text-red-500'>{entry.entryType}</span>}</td>
        //             <td>{entry.amount}</td>
        //             <td>{entry.remark}</td>
        //             <td className='edit'>
        //                 <AiOutlineEdit className='update' size={25} onClick={()=>action(entry,setUpdateId,setUpdate)}/>
        //                 <AiOutlineDelete className='delete' size={25} onClick={()=>action(entry._id,setDeleteId,setRemove)}/>
        //                 <BiDetail className='details' size={25} onClick={()=>action(entry._id,setDeleteId,setRemove)}/>
        //             </td>
        //         </tr>)
        //         }
        //     </tbody>
        // </table>
    );
};

export default Table;