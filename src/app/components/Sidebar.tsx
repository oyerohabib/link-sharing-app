"use client";
import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaDev, FaCodepen, FaArrowRight } from "react-icons/fa";
import { SiCodewars } from "react-icons/si";
import { AiOutlineYoutube, AiFillLinkedin } from "react-icons/ai";

export default function Sidebar() {
  const [links, setLinks] = useState([
    { platform: "GitHub", url: "https://github.com/benwright", icon: FiGithub },
    {
      platform: "YouTube",
      url: "https://youtube.com/benwright",
      icon: AiOutlineYoutube,
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/benwright",
      icon: AiFillLinkedin,
    },
    {
      platform: "Codewars",
      url: "https://codewars.com/benwright",
      icon: SiCodewars,
    },
    {
      platform: "FreeCodeCamp",
      url: "https://freecodecamp.com/benwright",
      icon: FaCodepen,
    },
    { platform: "Dev.To", url: "https://dev.to/benwright", icon: FaDev },
  ]);
  return (
    <div className="w-full md:w-2/5 p-4 flex">
      <div className="w-full bg-white p-4 shadow-md rounded">
        <div className="mb-4 text-center">
          <div className="w-24 h-24 rounded-full bg-borders mx-auto"></div>
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
              className={`flex items-center gap-2 p-4 mb-2 rounded-xl text-white ${getColor(
                link.platform
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <link.icon />
              </span>
              {link.platform}
              <span className="ml-auto">
                <FaArrowRight />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const getColor = (platform: string) => {
  switch (platform) {
    case "GitHub":
      return "bg-github";
    case "YouTube":
      return "bg-youtube";
    case "LinkedIn":
      return "bg-linkedin";
    case "Codewars":
      return "bg-codewars";
    case "Dev.To":
      return "bg-dark-grey";
    case "FreeCodeCamp":
      return "bg-freecodecamp";
    default:
      return "#000";
  }
};
