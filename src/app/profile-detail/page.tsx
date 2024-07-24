"use client";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { RiImage2Line } from "react-icons/ri";

const ProfileDetailsPage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "Ben",
    lastName: "Wright",
    email: "ben@example.com",
    image: "/profile-image.jpg",
  });

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-3/5 p-4">
          <div className="bg-white p-10 shadow-md rounded">
            <h2 className="text-3xl font-bold text-dark-grey mb-4">
              Profile Details
            </h2>
            <p className="text-grey text-base font-normal mb-8">
              Add your details to create a personal touch to your profile.
            </p>
            <div className="bg-light-grey rounded-lg p-5 mb-6 flex items-center justify-between">
              <div className="text-grey ">Profile picture</div>
              <div className="bg-light-purple text-purple font-semibold flex flex-col items-center justify-center rounded-lg size-[193px] ml-auto">
                <RiImage2Line className="w-8 h-7 mb-2" />+ Upload Image
              </div>
              <div className="text-xs text-grey mr-auto p-8">
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
  );
};

export default ProfileDetailsPage;
