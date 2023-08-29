import React from 'react'
import styled from 'styled-components'
import pfp from '../../Images/pfp.jpeg'
import { menuItems } from '../../Utils/menuitems'
import {signout} from '../../Utils/icons'
import { useAuthContext } from '../../Hooks/useAuthContext.js'
import { auth } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth'
import firebase from "firebase/compat/app";

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

    return (
        <NavStyled>
            <div className="user-container">
                <img src={pfp} alt="" />
                <div className="text">
                    <h2>{user ? (user.displayName) :  ('Please Sign In')}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {user ? (
                        <button className='sign-out' onClick={signOut}>Sign Out</button>
                    ) : (
                        <span className='sign-out' onClick={loginWithGoogle}>Sign in</span>
                    )}
                </li>
                <li>
                    <span>
                        {user ? (user.displayName) :  ('Please Sign In')}
                    </span>
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-container{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 87px;
            height: 87px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Login



