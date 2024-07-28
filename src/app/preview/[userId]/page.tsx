"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/clientApp";
import { getUserData } from "@/app/auth/lib/firebase";
import ProfilePreview from "@/app/components/ProfilePreview";
import Loading from "@/app/components/Loading";
import ProfileNotFound from "@/app/components/ProfileNotFound";
import { useAuth } from "@/app/context/AuthContext";

const UserPreviewPage: React.FC = () => {
  const { user } = useAuth();
  const userId = user.uid;
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileNotFound, setIsProfileNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      if (userId) {
        try {
          const data = await getUserData(db, userId as string);
          console.log("data", data);

          if (data) {
            setUserProfile(data);
            setIsProfileNotFound(false);
          } else {
            setIsProfileNotFound(true);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setIsProfileNotFound(true);
        }
      }
      setIsLoading(false);
    };

    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  if (isProfileNotFound) {
    return <ProfileNotFound />;
  }

  return (
    <div>
      {userProfile && (
        <ProfilePreview user={userProfile.user} links={userProfile.links} />
      )}
    </div>
  );
};

export default UserPreviewPage;
