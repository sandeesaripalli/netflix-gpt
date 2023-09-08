import React, { useRef, useState } from 'react'
import HeaderComponent from './HeaderComponent'
import {checkValidData} from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG } from '../utils/constants';
const Login = () => {
  const dispatch = useDispatch()
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    const toggleSignInForm=  () =>{
        setIsSignInForm(!isSignInForm);

    }
    const handleButtonClick = () =>{
      
        const message =checkValidData(email.current.value, password.current.value)
        setErrorMessage(message);
        if(message) return;
        if(!isSignInForm){
          //sign up logic
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              updateProfile(user, {
                displayName: name.current.value, photoURL: `https://robohash.org/${name.current.value}`
              }).then(() => {
                // Profile updated!

                // if thhis below code is not done we will see empty phto url and display name during first login redirect
                const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message)
              });
             
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "--" + errorMessage)
            });
        }else {
          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log('user', user)
              
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "--" + errorMessage)
            });
        }
    }
  return (
    <div>
    <div>
    <HeaderComponent />
    </div>
    <div className='absolute'>
    <img src={BG_IMG} alt='bg' />
    </div>
    <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75" onSubmit={(e) =>e.preventDefault()}>
    <h1 className='font-bold text-3xl py-4'>{isSignInForm ? 'Sign In' : "Sign up"}</h1>
    {!isSignInForm && (<input ref = {name} type="text" placeholder='Full name' className='p-4 my-4 w-full bg-gray-800' />)}
        <input ref = {email} type="email" placeholder='email' className='p-4 my-4 w-full bg-gray-800' />
        <input ref = {password} type="password" placeholder='password' className='p-4 my-4 w-full bg-gray-800' />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className="p-4 my-6 w-full bg-red-700 rounded-lg" onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : "Sign up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? 'New to Netflix? Sign Up' : "Already a member?Sign In"} </p>
    </form>
    </div>
  )
}

export default Login