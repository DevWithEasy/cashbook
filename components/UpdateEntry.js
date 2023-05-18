import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEntry } from '../libs/allEntryAction';
import { updatePrevEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';
import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

const EditEntry = ({entry,setUpdate}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        amount : entry.amount,
        entryType : entry.entryType,
        remark : entry.remark,
        reason : ""
    })

    return (

        <>
        <AiOutlineEdit className='text-blue-500 cursor-pointer' size={20} onClick={onOpen}/>
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
              <label htmlFor="">Amount</label>
                    <Input type="number" name="amount" value={value.amount} onChange={(e)=>handleInput(e,value,setValue)}/>
                    <label htmlFor="">Type</label>
                    <Select name="entryType" id="" onChange={(e)=>handleInput(e,value,setValue)}>
                        <option value={value.entryType}>{value.entryType}</option>
                        {
                            value.entryType == 'Credit' ?
                            <option value="Debit">Debit</option>
                            :
                            <option value="Credit">Credit</option>
                        }
                    </Select>
                    <label htmlFor="">Remarks</label>
                    <Input type="text" name="remark" value={value.remark} onChange={(e)=>handleInput(e,value,setValue)}/>
                    <label htmlFor="">Reason</label>
                    <Input type="text" name="reason" placeholder='Change reason' onChange={(e)=>handleInput(e,value,setValue)}/>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button 
                onClick={onClose}
                mr={3}
            >
                Cancel
            </Button>
                <Button  
                    onClick={()=>updateEntry(entry._id,value,dispatch,updatePrevEntry,onClose)}
                    colorScheme='blue' 
                >
                    Update
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

        // <div className='add_new'>
        //     <div className="">
        //         <h3>
        //             <span>UPDATE ENTRY</span>
        //             <span className='close' onClick={()=>setUpdate(false)}>X</span>
        //         </h3>
        //         <hr />
        //         <div className="input">
        //             <label htmlFor="">Amount</label>
        //             <input type="number" name="amount" value={value.amount} onChange={(e)=>handleInput(e,value,setValue)}/>
        //             <label htmlFor="">Type</label>
        //             <select name="entryType" id="" onChange={(e)=>handleInput(e,value,setValue)}>
        //                 <option value={value.entryType}>{value.entryType}</option>
        //                 <option value="Credit">Credit</option>
        //                 <option value="Debit">Debit</option>
        //             </select>
        //             <label htmlFor="">Remarks</label>
        //             <input type="text" name="remark" value={value.remark} onChange={(e)=>handleInput(e,value,setValue)}/>
        //             <label htmlFor="">Reason</label>
        //             <input type="text" name="reason" placeholder='Change reason' onChange={(e)=>handleInput(e,value,setValue)}/>
        //         </div>
        //         <hr />
        //         <div className="submit">
        //             {
        //                 loading && <Trying text='Updating'/>
        //             }
        //             <button className='in' onClick={()=>updateEntry(entry._id,value,setUpdate,setLoading,dispatch,updatePrevEntry)}>UPDATE</button>
        //         </div>
        //     </div>
        // </div>
    );
};

export default EditEntry;