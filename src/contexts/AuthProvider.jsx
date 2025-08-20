import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import useAxios from '../Hooks/useAxios';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosInstance = useAxios()
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const loginUser = async (email, password) => {
        setLoading(true)
        const user = await signInWithEmailAndPassword(auth, email, password)

         // ✅ get token from backend and save to cookie
        await axiosInstance.post('/jwt', { email }, {
            withCredentials : true
        });
        
        return user
    }

    const registerUser = async (email, password) => {
        setLoading(true)
        const user = await createUserWithEmailAndPassword(auth, email, password)
        
        // ✅ get token from backend and save to localStorage
        await axiosInstance.post('/jwt', { email },{
            withCredentials : true
        });
        return user
    }

    const googleLogin = async () => {
        setLoading(true)
        const result = await signInWithPopup(auth, googleProvider)
        const email = result.user.email

        // ✅ get token from backend and save to localStorage
        await axiosInstance.post('/jwt', { email },{
            withCredentials : true
        });
        return result
    }

    const firebaseEmailVerify = async (email) => {
        const verify = await fetchSignInMethodsForEmail(auth, email)
        return verify
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

    const logOut = async() => {
        await axiosInstance.post('/jwt/logout', {}, {
            withCredentials: true
        });
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
        googleLogin,
        firebaseEmailVerify,
        theme,
        setTheme
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;