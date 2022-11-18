import toast from 'react-hot-toast';
export  function notificationOK(msg){
    toast.success(msg)
}

export  function notificationNOT(msg){
    toast.error(msg)
}