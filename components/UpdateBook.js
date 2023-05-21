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
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../libs/allBookAction';
import { renameBook } from '../store/slice/bookSlice';

const UpdateBook = ({id,setUpdateBook}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const book = useSelector(state=> state.book.currentBook)
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState(book?.name)
    const dispatch = useDispatch()
    return (
<>
<button className="flex items-center space-x-2" onClick={onOpen}>
    <MdDriveFileRenameOutline/>
    <span>Rename</span>
</button>

<Modal
  isOpen={isOpen}
  onClose={onClose}
  isCentered
>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Update Book Name</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
      <FormControl>
      `<label htmlFor="">Book name</label>
        <Input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
      </FormControl>
    </ModalBody>

    <ModalFooter>
        <Button  
            onClick={(e)=>updateBook(book._id,value,setLoading,dispatch,renameBook,onClose)}
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

export default UpdateBook;