import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }

    const registerUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email, password)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    const authData = {
        user,
        setUser,
        loginUser,
        updateUserProfile,
        registerUser,
        loading,
        logOut
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;