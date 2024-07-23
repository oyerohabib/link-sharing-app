import React from "react";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4">
        <button className="px-4 py-2 bg-gray-500 text-white rounded">
          Back to Editor
        </button>
        <button className="ml-4 px-4 py-2 bg-purple-500 text-white rounded">
          Share Link
        </button>
      </div>
      <div className="bg-white p-8 shadow-md rounded text-center">
        <div className="w-24 h-24 rounded-full bg-borders mx-auto"></div>
        <h1 className="text-2xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
        <p className="text-gray-600 mb-4">{profile.email}</p>
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
      </div>
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
