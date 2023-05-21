import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../libs/AllUserAction';
import { login } from '../store/slice/authSlice';
import handleInput from '../utils/handleInput';
import Trying from './Trying';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
  } from '@chakra-ui/react'

const UpdateProfile = ({setUpdate}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        name : user.name,
        email : user.email,
        number : user.number
    })
    return (
        <>
      <Button onClick={onOpen}>Update</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <div className="input">
                    <label htmlFor="name">Name :</label>
                    <Input type="text" name="name" onChange={(e)=>handleInput(e,value,setValue)} value={value.name}/>

                    <label htmlFor="email">Email : </label>
                    <Input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} value={value.email}/>

                    <label htmlFor="number">Number :</label>
                    <Input type="number" name="number" onChange={(e)=>handleInput(e,value,setValue)} value={value.number}/>
                </div>
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={(e)=>updateProfile(e,value,setUpdate,setLoading,dispatch,login)}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
};

export default UpdateProfile;