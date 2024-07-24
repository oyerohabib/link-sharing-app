import React from "react";
import { IconType } from "react-icons";

interface LinkButttonProps {
  url: string;
  id: number;
  bgColor: string;
  name: string;
  icon: IconType;
}

export default function LinkButtton({
  url,
  id,
  bgColor,
  icon: Icon,
  name,
}: LinkButttonProps) {
  return (
    <a
      key={id}
      href={url}
      className="block py-2 px-4 mb-2 rounded"
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: getColor(bgColor) }}
    >
      <span>
        <Icon />
      </span>
      {name}
    </a>
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
