import { db } from "@/app/firebase/clientApp";
import { Link, User, UserData } from "@/app/types";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createUserDocument = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      links: [],
      uid: user.uid,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error("Error creating user document: ", error);
  }
};

export const getUserData = async (
  db: any,
  userId: string
): Promise<UserData> => {
  // update fn name to getUserData
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data() || {};
    } else {
      console.log("No such document!");
      return {};
    }
  } catch (error) {
    console.error("Error fetching links: ", error);
    return {};
  }
};

export const addLink = async (userId: string, link: Link): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      links: arrayUnion(link),
    });
  } catch (error) {
    console.error("Error adding link: ", error);
  }
};

export const removeLink = async (userId: string, link: Link): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      links: arrayRemove(link),
    });
  } catch (error) {
    console.error("Error removing link: ", error);
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw error;
  }
};

const storage = getStorage();

export const uploadImage = async (
  file: File,
  userId: string
): Promise<string> => {
  const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
