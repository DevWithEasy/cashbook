import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../libs/AllUserAction';
import { logout } from '../store/slice/authSlice';
import { logoutReset, removeEntry } from '../store/slice/bookSlice';
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
  } from '@chakra-ui/react'

const DeleteAccount = ({setDeleteAccount}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const router = useRouter()
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)
    return (
        // <div className='add_new'>
        //     <div className="">
        //         <h3>
        //             <span>ARE YOU SURE ?</span>
        //             <span className='close' onClick={()=>setDeleteAccount(false)}>X</span>
        //         </h3>
        //         <hr />
        //         <div className="input">
        //            <p>This account will be delete parmanently.You cannot back your account.</p>
        //            <p>We delete your</p>
        //            <ul className='pl-4 list-disc'>
        //             <li>Account info</li>
        //             <li>Books</li>
        //             <li>Entries</li>
        //            </ul>
        //         </div>
        //         <hr />
        //         <div className="submit">
        //             {
        //                 loading && <Trying text='Deleting'/>
        //             }
        //             <button className='cancel hidden sm:block' onClick={()=>setDeleteAccount(false)}>CANCEL</button>
        //             <button className='delete' onClick={()=>deleteAccount(setDeleteAccount,router,setLoading,dispatch,logout,logoutReset)}>DELETE</button>
        //         </div>
        //     </div>
        // </div>
        <>
      <Button colorScheme='red' onClick={onOpen}>
        Delete
      </Button>

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
            <div className="input">
                   <p>This account will be delete parmanently.You cannot back your account.</p>
                   <p>We delete your</p>
                   <ul className='pl-4 list-disc'>
                    <li>Account info</li>
                    <li>Books</li>
                    <li>Entries</li>
                   </ul>
                </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' ml={3} onClick={()=>deleteAccount(setDeleteAccount,router,setLoading,dispatch,logout,logoutReset)}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
    );
};

export default DeleteAccount;