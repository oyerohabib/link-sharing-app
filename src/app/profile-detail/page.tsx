"use client";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { RiImage2Line } from "react-icons/ri";
import ProtectedRoute from "../components/ProtectedRoute";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

interface User {
  uid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
}

const saveUserInfo = async (db: any, user: User): Promise<void> => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      email: user.email,
    });
    console.log("User information saved successfully.");
  } catch (error) {
    console.error("Error saving user information: ", error);
  }
};

const ProfileDetailsPage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "Ben",
    lastName: "Wright",
    email: "ben@example.com",
    image: "/profile-image.jpg",
  });

  const handleChange = (e: any) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-light-grey p-4 sm:p-6">
        <Header />
        <main className="flex flex-col md:flex-row gap-6">
          <Sidebar />
          <div className="w-full lg:w-3/5 py-4">
            <div className="bg-white p-6 sm:p-10 shadow-md rounded-xl">
              <h2 className="text-3xl font-bold text-dark-grey mb-4">
                Profile Details
              </h2>
              <p className="text-grey text-base font-normal mb-8">
                Add your details to create a personal touch to your profile.
              </p>
              <div className="bg-light-grey rounded-lg p-5 mb-6 flex flex-col gap-4 md:gap-2 md:flex-row md:items-center justify-between">
                <div className="text-grey flex-1">Profile picture</div>
                <div className="bg-light-purple text-purple font-semibold flex flex-2 lg:flex-1 flex-col items-center justify-center rounded-lg py-8 px-4 size-[193px] md:ml-auto text-center">
                  <RiImage2Line className="w-8 h-7 mb-2" />+ Upload Image
                </div>
                <div className="text-xs text-grey flex-1 md:mr-auto md:p-6">
                  Image must be below 1024x1024px. <br /> Use PNG or JPG format.
                </div>
              </div>
              <div className="bg-light-grey rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <label className="mb-2 w-1/2 text-grey">
                    First Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="py-3 px-4 border border-borders rounded w-1/2"
                    placeholder="e.g "
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mb-2 w-1/2 text-grey">
                    Last Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="py-3 px-4 border border-borders rounded w-1/2"
                    value={profile.lastName}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mb-2 w-1/2 text-grey">
                    Email<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="py-3 px-4 border border-borders rounded w-1/2"
                    value={profile.email}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ProfileDetailsPage;
