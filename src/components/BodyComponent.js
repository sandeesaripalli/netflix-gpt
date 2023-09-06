import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice'

const BodyComponent = () => {
  const dispatch = useDispatch()
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ])

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          
          // ...
        } else {
          // User is signed out
          dispatch(removeUser())
         
        }
      });
      return () => {
        // Cleanup by unsubscribing the listener when the component unmounts.
        unsubscribe();
      }
    },[dispatch])
  return (
    <div><RouterProvider router={appRouter} /></div>
  )
}

export default BodyComponent