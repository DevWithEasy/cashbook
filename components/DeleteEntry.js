import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteEntry } from '../libs/allEntryAction';
import { removeEntry } from '../store/slice/bookSlice';
import { useState } from 'react';

const DeleteEntry = ({entry}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading] = useState(false)
  const cancelRef = React.useRef()
    const dispatch = useDispatch();
    return (
        <>

      <AiOutlineDelete className='text-red-500 cursor-pointer' size={20} onClick={onOpen}/>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>deleteEntry(entry._id,setLoading,dispatch,removeEntry,onClose)} ml={3}>
              {loading ? <Spinner/> : 'Delete'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    );
};

export default DeleteEntry;