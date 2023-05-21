import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEntry } from '../libs/allEntryAction';
import { updatePrevEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';
import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure,Spinner } from '@chakra-ui/react';
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
                    onClick={()=>updateEntry(entry._id,value,setLoading,dispatch,updatePrevEntry,onClose)}
                    colorScheme='blue' 
                >
                    {loading ? <Spinner/> : 'Update'}
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default EditEntry;