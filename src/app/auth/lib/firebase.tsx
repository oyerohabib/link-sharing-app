import { db } from "@/app/firebase/clientApp";
import { Link, User } from "@/app/types";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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
    console.log("User document created successfully.");
  } catch (error) {
    console.error("Error creating user document: ", error);
  }
};

export const fetchLinks = async (db: any, userId: string): Promise<Link[]> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      console.log("links fetched successfully");
      console.log(userDoc.data()?.links);
      return userDoc.data()?.links || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching links: ", error);
    return [];
  }
};

export const addLink = async (userId: string, link: Link): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      links: arrayUnion(link),
    });
    console.log("Link added successfully.");
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
    console.log("Link removed successfully.");
  } catch (error) {
    console.error("Error removing link: ", error);
  }
};
