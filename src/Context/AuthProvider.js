import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    //Login success -> direct to
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    //useEffect will listen for Event login successful?
    React.useEffect(() => {
        const unsubscribed =  auth.onAuthStateChanged((user) => {
            //console.log({ user });
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL
                });
                setIsLoading(false);
                history.push('/');
                return;
            }
            // reset user info
            setUser({});
            setIsLoading(false);
            history.push('/login');
        });
            //Clean function 
        return () => {
            unsubscribed();
        };
    }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
        {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}
