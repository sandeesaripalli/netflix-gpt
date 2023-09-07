import React, { useEffect } from 'react'
import { LOGO } from '../utils/constants'
import { signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const handleSignOut =() =>{
    signOut(auth).then(() => {
     
    
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        
        navigate('/browse')
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate('/')
       
      }
    });
    return () => {
      // Cleanup by unsubscribing the listener when the component unmounts.
      unsubscribe();
    }
  },[dispatch, navigate])
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