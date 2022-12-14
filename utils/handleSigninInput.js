const handleSigninInput=(e,value,setValue,error,setError)=>{
    let valid

         //CHECK EMAIL
         if (e.target.name==='email') {
           const checkValidEmail= /\S+@\S+\.\S+/
           valid = checkValidEmail.test(e.target.value)
             if(!valid){
                 const newError = {...error}
                 newError[e.target.name] = "Please Enter a valid email address"
                 setError(newError)
             }
         }
     
         //CHECK PASSWORD
         if (e.target.name === 'password') {
             const checkValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
             valid = checkValidPassword.test(e.target.value)
             if(!valid){
                 const newError = {...error}
                 newError[e.target.name] = "Password will be mixed uppercase and lowercase number and special characters"
                 setError(newError)
             }
         }
     
         if(valid){
            const newInput = { ...value };
            newInput[e.target.name] = e.target.value;
            setValue(newInput);
            const newError = {...error}
              newError[e.target.name] = ""
              setError(newError)
          }
}
export default handleSigninInput;