import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfilePreview = ({ user, links }) => {
  const pathname = usePathname();

  const userIdFromUrl = pathname.split("/")[2];

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

  const userId = user?.uid || userIdFromUrl;

  return (
    <div className="min-h-screen xs:bg-light-grey flex flex-col">
      <header className="w-full xs:h-[357px] p-6 xs:bg-purple rounded-[0_0_32px_32px] relative">
        <div className="w-full xs:bg-white flex justify-between xs:p-4 rounded-lg font-semibold">
          {user && user.uid ? (
            <button
              className="px-4 py-2 border border-purple text-purple rounded-lg hover:bg-light-purple transition duration-200"
              onClick={() => window.history.back()}
            >
              Back to Editor
            </button>
          ) : (
            <Link href={"/auth/register"}>
              <button className="px-4 py-2 border border-purple text-purple rounded-lg hover:bg-light-purple transition duration-200">
                Create account
              </button>
            </Link>
          )}

          <button
            className="ml-auto px-4 py-2 bg-purple text-white rounded-lg"
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
        Newlinks={links}
      />
    </div>
  );
};

export default ProfilePreview;
