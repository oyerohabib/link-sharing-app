import React from "react";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaFreeCodeCamp,
  FaDev,
} from "react-icons/fa";
import { SiCodewars } from "react-icons/si";

interface InputSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const socialMediaOptions = [
  { label: "GitHub", value: "github", icon: <FaGithub /> },
  { label: "YouTube", value: "youtube", icon: <FaYoutube /> },
  { label: "LinkedIn", value: "linkedin", icon: <FaLinkedin /> },
  { label: "Codewars", value: "Codewars", icon: <SiCodewars /> },
  { label: "FreeCodeCamp", value: "FreeCodeCamp", icon: <FaFreeCodeCamp /> },
  { label: "Dev.to", value: "Dev.to", icon: <FaDev /> },
];

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="text-xs text-dark-grey">{label}</label>
      <div className="relative">
        <select
          className="w-full p-2 pl-10 pr-8 py-3 px-10 border border-borders rounded-lg appearance-none focus:ring-purple focus:border-purple"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {socialMediaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          {socialMediaOptions.find((option) => option.value === value)?.icon}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InputSelect;
