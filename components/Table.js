import Link from 'next/link';
import React from 'react';
import EditEntry from './UpdateEntry';
import DeleteEntry from './DeleteEntry';

const Table = ({entries,search}) => {

    return (
        <div className="entry_list">
            <div className="space-y-2 pb-4">
                {
                    entries.filter(entrie=> entrie.remark.toLowerCase().includes(search)).map(entry=><div key={entry._id} className='rounded'>
                        <div className='realtive flex justify-between items-center px-2 py-1'>
                            <span className='text-sm'>{new Date(entry.createdAt).toDateString()}</span>
                            <div className="flex items-center space-x-4">
                                <EditEntry {...{entry}}/>
                                <DeleteEntry {...{entry}}/>
                            </div>
                        </div>
                        <div className='bg-white'>
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
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Table;