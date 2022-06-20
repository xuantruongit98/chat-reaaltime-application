import React from 'react'
import { Typography } from 'antd';
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
    //googleLogin
    const handleGoogleLogin = async() => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName ?.toLowerCase()),
            });
        }
    };
    //fbLogin
    const handleFbLogin = async() => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(facebookProvider);

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName ?.toLowerCase()),
            });
        }
    };

    return ( 
        <div id="login-page">
            <div id="login-card">
                <h2>Chat Realtime Application</h2>
                <div 
                    className="login-button google"
                    onClick={() => handleGoogleLogin(googleProvider)}
                >
                    <GoogleOutlined /> SIGN IN WITH GOOGLE
                </div>
            <br /> <br />
                <div 
                    className="login-button facebook"
                    onClick={() => handleFbLogin(facebookProvider)}
                >
                    <FacebookOutlined /> SIGN IN WITH FACEBOOK
                </div>
            </div>
        </div>
    );
}