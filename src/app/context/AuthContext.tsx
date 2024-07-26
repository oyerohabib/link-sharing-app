"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "@/app/firebase/clientApp";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import { createUserDocument, getUserData } from "../auth/lib/firebase";
import { Link } from "../types";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getLinks = async () => {
      if (user?.uid) {
        const userData = await getUserData(db, user.uid);
        if (userData) {
          setUser((prevUser) => ({
            ...prevUser,
            ...userData,
          }));
          setLinks(userData.links || []);
        }
      }
    };
    getLinks();
  }, [user?.uid]);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Call createUserDocument after the user is created
      await createUserDocument({
        email: user.email,
        firstName: "",
        lastName: "",
        links: [],
        uid: user.uid,
        profilePicture: "",
      });
      return user;
    } catch (error) {
      console.error("Error during sign-up: ", error);
      throw error;
    }
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
    setUser({ email: null, uid: null });
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signUp, logIn, logOut, links, setLinks }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
