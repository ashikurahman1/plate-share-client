import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  // sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext();

const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal 
  ? 'http://localhost:5100/api' 
  : 'https://plate-share-serv1.vercel.app/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const fetchDbUser = async (user) => {
    try {
      const res = await fetch(`${API_URL}/users/${user.email}`);
      
      if (!res.ok) {
        // If the endpoint doesn't exist yet (404) or server error, 
        // we might need to create the user or just wait
        console.warn('API returned non-ok status:', res.status);
        return;
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('API did not return JSON');
        return;
      }

      const data = await res.json();
      
      if (!data) {
        // Automatically sync to DB if missing
        const newUser = {
          email: user.email,
          photoURL: user.photoURL,
          name: user.displayName, // Mapping Firebase displayName to DB name
          createdAt: new Date(),
          role: user.email === 'admin@test.com' ? 'admin' : 'user'
        };
        const postRes = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        
        if (postRes.ok) {
          const postData = await postRes.json();
          setDbUser({ ...newUser, role: postData.role || newUser.role });
        }
      } else {
        setDbUser(data);
      }
    } catch (error) {
      console.error('Error fetching/syncing db user:', error);
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithEmail = async (email, password, remember) => {
    setLoading(true);
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = () => {
    setLoading(true);
    setDbUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || null);
      if (currentUser?.email) {
        fetchDbUser(currentUser);
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    dbUser,
    setUser,
    setDbUser,
    fetchDbUser,
    createUser,
    userLogout,
    loading,
    loginWithGoogle,
    loginWithEmail,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
