import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEntry, createEntryOther } from '../libs/allEntryAction';
import { addEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';
import {MdLibraryAdd,MdAddCircle} from "react-icons/md"
import {
    Button,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import { AiOutlineMinus } from 'react-icons/ai';

const CashOut = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const book = useSelector(state=>state.book.currentBook)
    const dispatch = useDispatch()
    const [value,setValue] = useState({
        book : book._id,
        amount : '',
        entryType : 'Debit',
        remark : '',
        history : []
    })
    return (
        <>
        <button className="out" onClick={onOpen}>
            <AiOutlineMinus/>
            <span>Cash out</span>
        </button>
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                    <label htmlFor="amount">Amount</label>
                    <Input 
                        type="number" 
                        name="amount" 
                        placeholder='100' 
                        onChange={(e)=>handleInput(e,value,setValue)}
                    />
                    <label htmlFor="">Remarks</label>
                    <Input 
                        type="text" 
                        name="remark" 
                        placeholder='Salary' 
                        onChange={(e)=>handleInput(e,value,setValue)}
                    />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button 
                onClick={()=>createEntryOther(book._id,value,setValue,"Debit",dispatch,addEntry)}
                colorScheme='blue'
                mr={3}
            >
                <MdLibraryAdd/>
            </Button>
                <Button  
                    onClick={()=>createEntry(book._id,value,setValue,'Debit',dispatch,addEntry,onClose)}
                    colorScheme='blue' 
                >
                    <MdAddCircle/>
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default CashOut;