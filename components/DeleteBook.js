import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook } from '../libs/allBookAction';
import { removeBook } from '../store/slice/bookSlice';
import Trying from './Trying';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useDisclosure,
    Spinner,
  } from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai';


const DeleteBook = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading] = useState(false)
    const cancelRef = React.useRef()
    const book = useSelector(state=> state.book.currentBook)
    const dispatch = useDispatch();
    const router = useRouter();
    
    return (
        <>
      <button  className='flex items-center space-x-2' onClick={onOpen}>
            <AiOutlineDelete/>
            <span>Delete</span>
        </button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Book
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={()=>deleteBook(book._id,router,setLoading,dispatch,removeBook)}
                colorScheme='red'
                ml={3}
               >
                {loading ? <Spinner/> : 'Delete'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    );
};

export default DeleteBook;