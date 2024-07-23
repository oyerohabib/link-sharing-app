"use client";

import { useState } from "react";

const LinksPage: React.FC = () => {
  const [links, setLinks] = useState([
    { platform: "GitHub", url: "https://github.com/benwright" },
    { platform: "YouTube", url: "https://youtube.com/benwright" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/benwright" },
  ]);

  return (
    <>
      <div className="w-full md:w-1/2 p-4">
        <div className="bg-white p-4 shadow-md rounded">
          <div className="mb-4 text-center">
            <div className="w-24 h-24 rounded-full mx-auto"></div>
            <h1 className="text-xl font-bold mt-2">Ben Wright</h1>
            <a href="https://benwright.com" className="text-purple-500">
              benwright.com
            </a>
          </div>
          <div>
            {links.map((link, index) => (
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
      <div className="w-full md:w-1/2 p-4">
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-lg font-bold mb-4">Customize your links</h2>
          <p className="text-gray-600 mb-4">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button className="px-4 py-2 bg-purple-500 text-white rounded mb-4">
            + Add new link
          </button>
          {links.map((link, index) => (
            <div key={index} className="mb-4">
              <select className="w-full mb-2 p-2 border rounded">
                <option>GitHub</option>
                <option>YouTube</option>
                <option>LinkedIn</option>
              </select>
              <input
                type="url"
                className="w-full p-2 border rounded"
                value={link.url}
              />
            </div>
          ))}
          <button className="px-4 py-2 bg-purple-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </>
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

export default LinksPage;
