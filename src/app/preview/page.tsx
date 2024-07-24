import Link from "next/link";
import React from "react";
import Sidebar from "../components/Sidebar";

const PreviewPage: React.FC = () => {
  const profile = {
    firstName: "Ben",
    lastName: "Wright",
    email: "ben@example.com",
    image: "/profile-image.jpg",
    links: [
      { platform: "GitHub", url: "https://github.com/benwright" },
      { platform: "YouTube", url: "https://youtube.com/benwright" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/benwright" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full h-[357px] p-6 bg-purple rounded-[0_0_32px_32px] relative">
        <div className="w-full bg-white flex justify-between p-4 rounded-lg font-semibold">
          <Link href={"/"}>
            <button className="px-4 py-2 border border-purple text-purple rounded-lg">
              Back to Editor
            </button>
          </Link>
          <button className="ml-4 px-4 py-2 bg-purple text-white rounded-lg">
            Share Link
          </button>
        </div>
      </header>
      <Sidebar
        width={"w-[450px]"}
        padding={"py-12 px-14"}
        className={"mx-auto relative mt-[-170px]"}
      />
      {/* <div className="bg-white py-12 px-14 shadow rounded-lg text-center mx-auto relative mt-[-200px] w-[349px]">
        <div className="size-28 rounded-full bg-borders mx-auto mb-6"></div>
        <h1 className="text-3xl text-dark-grey font-bold mb-2">{`${profile.firstName} ${profile.lastName}`}</h1>
        <p className="text-grey mb-14">{profile.email}</p>
        <div>
          {profile.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block py-2 px-4 mb-2 rounded"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: getColor(link.platform) }}
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div> */}
    </div>
  );
};

const getColor = (platform: string) => {
  switch (platform) {
    case "GitHub":
      return "#333";
    case "YouTube":
      return "#FF0000";
    case "LinkedIn":
      return "#0077B5";
    default:
      return "#000";
  }
};

export default PreviewPage;
