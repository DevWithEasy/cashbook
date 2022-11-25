import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:"AIzaSyDTpZspon8vV9sJGL6JCmK4UvpuQsTXtsY",
  authDomain: "cashbook-devwitheasy.firebaseapp.com",
  projectId: "cashbook-devwitheasy",
  storageBucket: "cashbook-devwitheasy.appspot.com",
  messagingSenderId: "648267390074",
  appId: "1:648267390074:web:7becf69557f782677dafc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();