import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import type { User } from 'firebase/auth';

const auth = getAuth(app);

export { auth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, type User };
