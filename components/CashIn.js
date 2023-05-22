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
    Spinner,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdAddCircle, MdLibraryAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createEntry, createEntryOther } from '../libs/allEntryAction';
import { addEntry } from '../store/slice/bookSlice';
import handleInput from '../utils/handleInput';

const CashIn = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const book = useSelector(state=>state.book.currentBook)
    const dispatch = useDispatch()
    const [value,setValue] = useState({
        book : id,
        amount : '',
        entryType : 'Credit',
        remark : '',
        history : []
    })
    
    return (
        <>
        <button className="in" onClick={onOpen}>
            <AiOutlinePlus/>
            <span>Cash in</span>
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
                onClick={()=>createEntryOther(id,value,setValue,"Credit",setLoading2,dispatch,addEntry)}
                colorScheme='blue'
                mr={3}
            >
                {loading2 ? <Spinner/> : <MdLibraryAdd/>}
            </Button>
                <Button  
                    onClick={()=>createEntry(id,value,setValue,'Credit',setLoading,dispatch,addEntry,onClose)}
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

export default CashIn;