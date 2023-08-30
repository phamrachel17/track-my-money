import React from 'react'
import styled from 'styled-components'
import {signout} from '../../Utils/icons'
import { useAuthContext } from '../../Hooks/useAuthContext.js'
import { auth } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth'
import firebase from "firebase/compat/app";
import Button from 'react-bootstrap/Button';

import * as reactIconsFa from "https://cdn.skypack.dev/react-icons@4.2.0/fa";
import * as reactIconsRi from "https://cdn.skypack.dev/react-icons@4.2.0/ri";
import * as reactJss from "https://cdn.skypack.dev/react-jss@10.5.1";
const { useState, createContext, useContext } = React;
const { ThemeProvider, withStyles } = reactJss;
// const { BrowserRouter, Switch, Route, useHistory } = ReactRouterDOM;
const { FaChessBishop, FaPlusCircle, FaArrowLeft } = reactIconsFa;
const { RiMoonClearLine, RiSunLine } = reactIconsRi;

function Login({active, setActive}) {

    const user = useAuthContext();

    const googleAuthProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((userCred) => {
                if (userCred) {
                    console.log(userCred);
                }
                else {
                    console.log("Auth issue")
                }
            })
    }

    const signOut = () => {
        auth.signOut();
    }


    // const classes = props.classes;
    // const history = useHistory();
 
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [formErrors, setFormErrors] = useState([]);
    // const [isSuccessed, setSuccess] = useState(false);
 
    // const redirectToRegistration = () => {
    //    history.push('/registration');
    // }
 
    // const emailValidate = (value) => {
    //    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    //    if (!emailRegex.test(value)) return 'Wrong email';
    //    return undefined;
    // }
 
    // const passwordValidate = (value) => {
    //    if (!value || value.length < 6) return 'Password must be more than 6 characters';
    //    return undefined;
    // }
 
 
    // const loginSubmitHandler = async (e) => {
    //    e.preventDefault();
 
    //    let errors = [];
    //    let emailCheck = emailValidate(email);
    //    if (emailCheck) errors.push(emailCheck);
 
    //    let passwordCheck = passwordValidate(password);
    //    if (passwordCheck) errors.push(passwordCheck);
 
    //    setFormErrors(errors);
    //    if (!errors.length) setSuccess(true);
    // }
 
    // return <div className={classes.loginCard}>
        
 
    //    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
    //       <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
    //       <span>Amazing service</span>
    //    </div>
 
    //    <h1 className={classes.cardHeader}>Log in</h1>
 
       {/* <div className="form">
 
          <form onSubmit={loginSubmitHandler}>
 
             {formErrors.length ? <Alert title="Failed to login">
                {formErrors.map(err => <div>{err}</div>)}
             </Alert> : ''}
 
             {isSuccessed ? <Alert type="success">Welcome!</Alert> : ''}
 
             <div name="email" validate={emailValidate}>
                <Label>
                   <span>Email</span>
                   <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Label>
             </div>
 
             <div name="password" validate={passwordValidate}>
                <Label>
                   <span>Password</span>
                   <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Label>
             </div>
 
             <div style={{ marginTop: '10px' }}>
                <Button type="submit" fullWidth>Log in</Button>
             </div>
 
          </form>
 
       </div> */}
 
       {/* <Divider /> */}
       {/* <Button fullWidth onClick={redirectToRegistration} color="green" iconLeft={<FaPlusCircle />}>Create account</Button> */}
       
       return (
        <LoginStyled>
            <div className="login-container">
                <li>
                    {user ? (
                        <button className='sign-out' onClick={signOut}>Sign Out</button>
                    ) : (
                        <Button size="lg" onClick={loginWithGoogle} variant="dark">Sign In with Google</Button>
                    )}
                </li>
            </div>
        </LoginStyled>
    )
       
    // </div>
 }

// function Login({active, setActive}) {
//     const user = useAuthContext();

//     const googleAuthProvider = new GoogleAuthProvider();
//     const loginWithGoogle = () => {
//         signInWithPopup(auth, googleAuthProvider)
//             .then((userCred) => {
//                 if (userCred) {
//                     console.log(userCred);
//                 }
//                 else {
//                     console.log("Auth issue")
//                 }
//             })
//     }

//     const signOut = () => {
//         auth.signOut();
//     }

    // return (
    //     <LoginStyled>
    //         <div className="login-container">
    //             <li>
    //                 {user ? (
    //                     <button className='sign-out' onClick={signOut}>Sign Out</button>
    //                 ) : (
    //                     <span className='sign-out' onClick={loginWithGoogle}>Sign in</span>
    //                 )}
    //             </li>
    //             <li>
    //                 <span>
    //                     {user ? (user.displayName) :  ('Please Sign In')}
    //                 </span>
    //             </li>
    //         </div>
    //     </LoginStyled>
    // )
// }

const LoginStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 100%;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .login-container{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }
`;

export default Login



