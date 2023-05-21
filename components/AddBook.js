import { useDispatch, useSelector } from 'react-redux';
import {createBook} from '../libs/allBookAction';
import { addBook } from '../store/slice/bookSlice';
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
  } from '@chakra-ui/react'

export default function AddBook() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name,setName] = useState("")
    const dispatch = useDispatch()
    return (
      <>
        <Button onClick={onOpen}>Add Book</Button>
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          
        >
          <ModalOverlay />
          <ModalContent className='mx-2'>
            <ModalHeader>Create new book</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <FormControl>
                <FormLabel>Book name</FormLabel>
                <Input placeholder='Daily Expense' onChange={(e)=>setName(e.target.value)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={onClose} mr={3}>Cancel</Button>
              <Button
                onClick={(e)=>createBook(name,dispatch,addBook,onClose)}
                colorScheme='blue' 
                
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
