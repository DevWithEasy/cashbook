import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../libs/AllUserAction';
import { login } from '../store/slice/authSlice';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'

const UpdateProfilePhoto = ({setUpdatePhoto,isOpen, onClose}) => {
    const user = useSelector(state=> state.auth.user)
    const dispatch = useDispatch()
    const [image,setImage] = useState(null)
    const [file,setFile] = useState(null)
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    return (     
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Profile Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <div className="input">
                    <div className="image">
                        <img src={image} alt=""/>
                    </div>
                    <label htmlFor="file">Choose a photo :</label>
                    <input type="file" onChange={(e)=>handleFile(e)}/>
                </div>
                </ModalBody>
    
                <ModalFooter>
                <Button  mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='blue' onClick={(e)=>uploadPhoto(e,user._id,file,setUpdatePhoto,dispatch,login)}>Upload</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateProfilePhoto;