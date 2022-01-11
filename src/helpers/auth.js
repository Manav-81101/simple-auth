// import firebase from 'firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { navigate } from "gatsby";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const isBrowser = typeof window !== "undefined";

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
    navigate("/app/home", { replace: true });
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
    navigate("app/home", { replace: true });
  } catch (err) {
    console.log(err);
    return err;
  }

  return false;
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();
  return !!user.email;
};

export const getCurrentUser = () => isLoggedIn() && auth.currentUser;

export const logout = async (callback) => {
  if (!isBrowser) return;

  await signOut(auth);
  setUser({});
  callback();
};
