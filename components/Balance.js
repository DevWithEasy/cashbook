import React from 'react';
import {BiPlus,BiMinus} from 'react-icons/bi';
import {TbEqual} from 'react-icons/tb'

const Balance = ({entries}) => {
    const credit = entries.filter(e=>e.entryType === "Credit").reduce((a,i)=>a+parseInt(i.amount),0)
    const debit = entries.filter(e=>e.entryType === "Debit").reduce((a,i)=>a+parseInt(i.amount),0)
    return (
        <div className='bg-gray-50 border border-gray-300 p-2 rounded sm:flex sm:justify-between sm:items-center mb-2 space-y-3 sm:space-y-0'>
            <div className="sm:flex sm:justify-center sm:items-center sm:w-4/12 sm:border-r-2">
                <div className="flex justify-between items-center sm:flex-col">
                    <p className='flex items-center space-x-1'>
                        <BiPlus color='green' size={20} className="bg-gray-300 rounded-full" />
                        <span className='text'>Total Cash In</span>
                    </p>
                    
                    <p className='font-bold text-green-500'>{credit}/-</p>
                </div>
            </div>
            <div className="sm:flex sm:justify-center sm:items-center sm:w-4/12 sm:border-r-2">
                <div className="flex justify-between items-center sm:flex-col">
                    <p className='flex items-center space-x-1'>
                        <BiMinus color='red' size={20} className="bg-gray-300 rounded-full"/>
                        <span className='text'>Total Cash out</span>
                    </p>
                    
                    <p className='font-bold text-red-500'>{debit}/-</p>
                </div>
            </div>
            <div className="sm:flex sm:justify-center sm:items-center sm:w-4/12">
                <div className="flex justify-between items-center sm:flex-col border-t-2 border-gray-400 sm:border-none pt-2 sm:pt-0">
                    <p className='flex items-center space-x-1'>
                        <TbEqual size={20} className="bg-gray-300 rounded-full"/>
                        <span className='text'>Total Cash In</span>
                    </p>
                    
                    <p className='font-bold'>{credit-debit}/-</p>
                </div>
            </div>
        </div>
    );
};

export default Balance;