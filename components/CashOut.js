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
    useDisclosure,
    Spinner
} from '@chakra-ui/react';
import { AiOutlineMinus } from 'react-icons/ai';

const CashOut = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const book = useSelector(state=>state.book.currentBook)
    const dispatch = useDispatch()
    const [value,setValue] = useState({
        book : id,
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
          isCentered
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
                onClick={()=>createEntryOther(id,value,setValue,"Debit",setLoading2,dispatch,addEntry)}
                colorScheme='blue'
                mr={3}
            >
                {loading2 ? <Spinner/> : <MdLibraryAdd/>}
                
            </Button>
                <Button  
                    onClick={()=>createEntry(id,value,setValue,'Debit',setLoading,dispatch,addEntry,onClose)}
                    colorScheme='blue' 
                >
                    {loading ? <Spinner/> : <MdAddCircle/>}
                    
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default CashOut;