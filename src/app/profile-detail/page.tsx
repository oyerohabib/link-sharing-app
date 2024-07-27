"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { RiImage2Line } from "react-icons/ri";
import ProtectedRoute from "../components/ProtectedRoute";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { useAuth } from "../context/AuthContext";
import { User, UserData } from "../types";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { uploadImage } from "../auth/lib/firebase";

const updateUserProfile = async (
  userId: string,
  profile: User
): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      firstName: profile.firstName,
      lastName: profile.lastName,
      profilePicture: profile.profilePicture,
    });
  } catch (error) {
    console.error("Error updating user profile: ", error);
  }
};

const ProfileDetailsPage: React.FC = () => {
  const { links, user, setUser } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: user.profilePicture,
    }));
  }, [user.profilePicture]);

  const [profile, setProfile] = useState({
    profilePicture: user.profilePicture || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const tempUrl = URL.createObjectURL(selectedFile);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: tempUrl,
      }));
    }
  };

  const handleSaveProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let profilePictureUrl = profile.profilePicture;
      if (file) {
        profilePictureUrl = await uploadImage(file, user.uid);
        console.log("profilePictureUrl", profilePictureUrl);
      }

      await updateUserProfile(user.uid, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        profilePicture: profilePictureUrl,
      });
      setUser((prevUser: UserData) => ({
        ...prevUser,
        firstName: profile.firstName,
        lastName: profile.lastName,
        profilePicture: profilePictureUrl,
      }));
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Error updating Profile.");
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-light-grey p-4 sm:p-6">
        <Header />
        <main className="flex flex-col md:flex-row gap-6">
          <Sidebar Newlinks={links} />
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
                <div
                  className="bg-light-purple text-purple font-semibold flex flex-2 lg:flex-1 flex-col items-center justify-center rounded-lg py-8 px-4 size-[193px] md:ml-auto text-center cursor-pointer relative"
                  onClick={handleClick}
                  style={{
                    backgroundImage: profile.profilePicture
                      ? `url(${profile.profilePicture})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!profile.profilePicture && (
                    <RiImage2Line className="w-8 h-7 mb-2" />
                  )}
                  <span className="relative z-10">
                    {profile.profilePicture ? "Update Image" : "+ Upload Image"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {profile.profilePicture && (
                    <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                  )}
                </div>
                <div className="text-xs text-grey flex-1 md:mr-auto md:p-6">
                  Image must be below 1024x1024px. <br /> Use PNG or JPG format.
                </div>
              </div>
              <form className="bg-light-grey rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <label className="mb-2 w-1/2 text-grey">
                    First Name<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="py-3 px-4 border border-borders rounded w-1/2"
                    placeholder="Enter your first name"
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
                    placeholder="Enter your last name"
                    className="py-3 px-4 border border-borders rounded w-1/2"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <label className="mb-2 w-1/2 text-grey">
                    Email<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="py-3 px-4 border border-borders rounded w-1/2 bg-gray-200"
                    value={profile.email}
                    readOnly
                  />
                </div>
                <button
                  className="px-6 py-3 bg-purple text-white rounded-lg flex ml-auto"
                  onClick={handleSaveProfile}
                >
                  {loading ? <Spinner /> : "Save"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ProfileDetailsPage;
