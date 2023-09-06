import React, { useRef, useState } from 'react'
import HeaderComponent from './HeaderComponent'
import {checkValidData} from '../utils/validate'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const email = useRef(null)
    const password = useRef(null)
    const toggleSignInForm=  () =>{
        setIsSignInForm(!isSignInForm);

    }
    const handleButtonClick = () =>{
      
        const message =checkValidData(email.current.value, password.current.value)
        setErrorMessage(message)
    }
  return (
    <div>
    <div>
    <HeaderComponent />
    </div>
    <div className='absolute'>
    <img src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/58126e35-739d-409f-9920-e213b5e2d640/US-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg"
    alt='bg' />
    </div>
    <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75" onSubmit={(e) =>e.preventDefault()}>
    <h1 className='font-bold text-3xl py-4'>{isSignInForm ? 'Sign In' : "Sign up"}</h1>
    {!isSignInForm && (<input type="text" placeholder='Full name' className='p-4 my-4 w-full bg-gray-800' />)}
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