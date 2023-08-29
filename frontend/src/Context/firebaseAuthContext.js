import React, { useEffect, useState } from "react"
import "firebase/auth";
import { auth } from "../Firebase";
// import firebase from "firebase/app";

export const firebaseAuthContext = React.createContext();
const FirebaseAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const value = { user };

    useEffect(() => {
        const userStateChanged = auth.onAuthStateChanged(setUser);
        return userStateChanged;
    }, [])

    return (
        //children is whatever is wrapped in firebaseAuthContext
        <firebaseAuthContext.Provider value={value}>
            {children}      
        </firebaseAuthContext.Provider>
    )
}

export default FirebaseAuthProvider