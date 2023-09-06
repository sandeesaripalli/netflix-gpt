import React from 'react'
import { LOGO } from '../utils/constants'
import { signOut } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const handleSignOut =() =>{
    signOut(auth).then(() => {
      dispatch(removeUser())
      navigate("/")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'><img className="w-44 " src={LOGO} alt="logo" />
    
    {user && (
    <div className='flex p-2'><img className = "w-12 h-12" src={user?.photoURL} alt="profile-img" />
    <button className='font-bold text-white' onClick={handleSignOut}>(sign out)</button>
    </div>
    )}
    </div>
    
  )
}

export default HeaderComponent