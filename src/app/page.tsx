"use client";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InputField from "./components/InputField";
import { FiLink } from "react-icons/fi";
import InputSelect from "./components/InputSelect";

const HomePage: React.FC = () => {
  const [links, setLinks] = useState([
    { platform: "GitHub", url: "https://github.com/benwright" },
    { platform: "YouTube", url: "https://youtube.com/benwright" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/benwright" },
  ]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-3/5 p-4">
          <div className="bg-white p-4 shadow-md rounded">
            <h2 className="text-3xl font-bold text-dark-grey mb-4">
              Customize your links
            </h2>
            <p className="text-grey text-base font-normal mb-8">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <button className="w-full text-base font-semibold p-[11px_27px] border border-purple text-purple rounded-lg mb-4">
              + Add new link
            </button>
            {links.map((link, index) => (
              <div key={index} className="mb-4 bg-light-grey p-5 rounded-xl">
                <InputSelect
                  label="Platform"
                  value={link.platform}
                  onChange={(newValue) => {
                    const newLinks = [...links];
                    newLinks[index].platform = newValue;
                    setLinks(newLinks);
                  }}
                />
                <InputField
                  id="url"
                  name="url"
                  type="url"
                  required
                  label="Link"
                  placeholder="Enter your Link"
                  icon={FiLink}
                />
              </div>
            ))}
            <button className="px-4 py-2 bg-purple text-white rounded-lg flex ml-auto">
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
