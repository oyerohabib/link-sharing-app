"use client";
import { useState } from "react";

const ProfileDetailsPage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "Ben",
    lastName: "Wright",
    email: "ben@example.com",
    image: "/profile-image.jpg",
  });

  return (
    <>
      <div className="w-full p-4">
        <div className="bg-white p-4 shadow-md rounded">
          <div className="mb-4">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-full bg-borders mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <button className="text-white">Change Image</button>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={profile.firstName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={profile.lastName}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={profile.email}
              />
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetailsPage;
