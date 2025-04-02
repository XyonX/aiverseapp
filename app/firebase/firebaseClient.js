import { auth } from "@/app/firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(email, password);
  return userCredential.user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(email, password);

  return userCredential.user;
};
