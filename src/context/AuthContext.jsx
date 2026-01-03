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

const isLocal = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname === '0.0.0.0' || 
  window.location.hostname.startsWith('192.168.') || 
  window.location.hostname.startsWith('10.');

const API_URL = isLocal 
  ? 'http://localhost:5100/api' 
  : 'https://plate-share-serv1.vercel.app/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const fetchDbUser = async (firebaseUser) => {
    if (!firebaseUser?.email) {
      setLoading(false);
      return;
    }
    
    try {
      const email = firebaseUser.email.toLowerCase();
      const res = await fetch(`${API_URL}/users/${email}`);
      
      if (!res.ok) {
        console.error('API error fetching user:', res.status);
        // If it's a 404, we might need to create the user record
        if (res.status === 404) {
             const newUser = {
              email,
              photoURL: firebaseUser.photoURL,
              name: firebaseUser.displayName || 'Anonymous',
              createdAt: new Date(),
              role: email === 'admin@test.com' ? 'admin' : 'user'
            };
            const postRes = await fetch(`${API_URL}/users`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUser),
            });
            if (postRes.ok) {
              const postData = await postRes.json();
              setDbUser({ ...newUser, ...postData });
            }
        }
        return;
      }

      const data = await res.json();
      
      if (!data) {
        // Automatically sync to DB if missing but res was OK (unlikely but safe)
        const newUser = {
          email,
          photoURL: firebaseUser.photoURL,
          name: firebaseUser.displayName || 'Anonymous',
          createdAt: new Date(),
          role: email === 'admin@test.com' ? 'admin' : 'user'
        };
        const postRes = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        
        if (postRes.ok) {
          const postData = await postRes.json();
          setDbUser({ ...newUser, ...postData });
        }
      } else {
        setDbUser(data);
      }
    } catch (error) {
      console.error('Error in fetchDbUser:', error);
    } finally {
      setLoading(false);
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
    setUser(null);
    return signOut(auth).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      if (currentUser?.email) {
        // Small delay to ensure Firebase state is fully propagated
        setTimeout(() => {
          fetchDbUser(currentUser);
        }, 500);
      } else {
        setDbUser(null);
        setLoading(false);
      }
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
