"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchUserProfile } from "@/app/auth/lib/firebase";
import Loading from "../components/Loading";
import Link from "next/link";
import { toast } from "react-toastify";

const PreviewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const copyPreviewUrl = (userId: string) => {
    const previewUrl = `${window.location.origin}/preview/${userId}`;
    navigator.clipboard
      .writeText(previewUrl)
      .then(() => {
        toast.success("Profile URL has been copied.");
      })
      .catch((error) => {
        toast.error("Error copying URL:", error);
      });
  };

  useEffect(() => {
    const getUserProfile = async () => {
      if (userId) {
        try {
          const profile = await fetchUserProfile(userId);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        }
        setLoading(false);
      }
    };

    getUserProfile();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-light-purple">
        <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The user you are looking for does not exist. Please check the URL or
          register a new account.
        </p>
        <Link href="/auth/register">
          <span className="px-6 py-3 bg-purple text-white rounded-lg">
            Get started
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen xs:bg-light-grey flex flex-col">
      <header className="w-full xs:h-[357px] p-6 xs:bg-purple rounded-[0_0_32px_32px] relative">
        <div className="w-full xs:bg-white flex justify-between xs:p-4 rounded-lg font-semibold">
          {/* <Link href={"/"}> */}
          <button
            className="px-4 py-2 border border-purple text-purple rounded-lg hover:bg-light-purple transition duration-200"
            onClick={() => router.back()}
          >
            Back to Editor
          </button>
          {/* </Link> */}
          <button
            className="ml-4 px-4 py-2 bg-purple text-white rounded-lg"
            onClick={() => copyPreviewUrl(userId)}
          >
            Share Link
          </button>
        </div>
      </header>
      <Sidebar
        width={"sm:w-[450px] w-3/4"}
        padding={"sm:py-12 sm:px-14 xs:py-8 xs:px-6 py-8"}
        className={"mx-auto relative xs:mt-[-170px]"}
        shadow={"xs:shadow-md"}
        Newlinks={userProfile.links}
      />
    </div>
  );
};

export default PreviewPage;
