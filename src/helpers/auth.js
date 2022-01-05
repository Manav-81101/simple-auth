// import firebase from 'firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { navigate } from 'gatsby';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDY4Oz0WffsyJ-60jep3EwaRcM10JsWVPQ',
  authDomain: 'thunkable-a655f.firebaseapp.com',
  databaseURL: 'https://thunkable-a655f.firebaseio.com',
  projectId: 'thunkable-a655f',
  storageBucket: 'thunkable-a655f.appspot.com',
  messagingSenderId: '250438261811',
  appId: '1:250438261811:web:6afe5c9d8c3a8cd9851746',
  measurementId: 'G-QKD4FQFX6D',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const isBrowser = typeof window !== 'undefined';

const getUser = () =>
  window.localStorage.firebaseUser
    ? JSON.parse(window.localStorage.firebaseUser)
    : {};

const setUser = (user) =>
  (window.localStorage.firebaseUser = JSON.stringify(user));

export const handleLogin = async ({ username, password }) => {
  if (!isBrowser) return false;
  try {
    const { user } = await signInWithEmailAndPassword(auth, username, password);
    setUser({ email: user.email, uid: user.uid });
    navigate('/app/home');
  } catch (err) {
    console.log(err);
    return err;
  }

  return false;
};
export const handleSignup = async ({ username, password }) => {
  if (!isBrowser) return false;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      username,
      password
    );
    setUser({ email: user.email, uid: user.uid });
    navigate('/app/home');
  } catch (err) {
    console.log(err);
    return err;
  }

  return false;
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();
  console.log(!!user.email);
  return !!user.email;
};

export const getCurrentUser = () => isBrowser && auth.currentUser;

export const logout = async (callback) => {
  if (!isBrowser) return;

  await signOut(auth);
  setUser({});
  callback();
};
