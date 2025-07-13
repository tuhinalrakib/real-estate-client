import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import useAxios from '../Hooks/useAxios';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosInstance = useAxios()
    const email = user?.email

    const loginUser = async(email, password) => {
        setLoading(true)
        const user = await signInWithEmailAndPassword(auth, email, password)
        await axiosInstance.post('/jwt',{email})
        return user
    }

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = async() => {
        setLoading(true)
        const user = await signInWithPopup(auth, googleProvider)
        await axiosInstance.post('/jwt',{email})
        return user
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

    const logOut = async () => {
        // 🧹 cookie clear করার backend call
        await axiosInstance.post(`${import.meta.env.VITE_url}/jwt/logout`, {});
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            setUser(currentuser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const authData = {
        user,
        setUser,
        loginUser,
        updateUserProfile,
        registerUser,
        loading,
        logOut,
        googleLogin
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;