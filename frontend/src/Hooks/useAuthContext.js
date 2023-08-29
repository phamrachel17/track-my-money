import { useContext } from 'react'
import { firebaseAuthContext } from '../Context/firebaseAuthContext'

export const useAuthContext = () => {
    const context = useContext(firebaseAuthContext);
    debugger;
    if (!context) {
        throw Error('useAuthContext must be used inside a FirebaseAuthProvider')
    }
    return (
        context.user
    )
}

export default useAuthContext;