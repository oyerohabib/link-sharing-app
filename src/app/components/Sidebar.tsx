"use client";
import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaDev, FaCodepen, FaArrowRight } from "react-icons/fa";
import { SiCodewars } from "react-icons/si";
import { AiOutlineYoutube, AiFillLinkedin } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  width?: string;
  className?: string;
  padding?: string;
  shadow?: string;
  Newlinks?: Array<any>;
}

export default function Sidebar({
  width,
  className,
  padding,
  shadow,
  Newlinks,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const mapPlatformToIcon = {
    GitHub: FiGithub,
    YouTube: AiOutlineYoutube,
    LinkedIn: AiFillLinkedin,
    Codewars: SiCodewars,
    FreeCodeCamp: FaCodepen,
    "Dev.To": FaDev,
  };

  return (
    <div
      className={`py-4 ${width ? width : "w-full lg:w-2/5"} ${className} ${
        pathname === "/preview" ? "" : "lg:flex hidden"
      }`}
    >
      <div
        className={`${padding} w-full bg-white ${
          shadow ? shadow : "shadow-md"
        } rounded-xl p-10`}
      >
        <div className="mb-4 text-center">
          <div className="size-28 rounded-full bg-borders border-4 border-purple mx-auto mb-6"></div>
          <h1 className="text-3xl text-dark-grey font-bold mb-2">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-grey mb-14">{user.email}</p>
        </div>
        <div>
          {Newlinks.map((link, index) => {
            const IconComponent = mapPlatformToIcon[link.platform];
            return (
              <a
                key={index}
                href={link.url}
                className={`flex items-center gap-2 p-4 mb-5 rounded-xl text-white ${getColor(
                  link.platform
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {IconComponent && <IconComponent />}
                {link.platform}
                <span className="ml-auto">
                  <FaArrowRight />
                </span>
              </a>
            );
          })}
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
