"use client";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InputField from "./components/InputField";
import { FiLink } from "react-icons/fi";
import InputSelect from "./components/InputSelect";
import ProtectedRoute from "./components/ProtectedRoute";
import Image from "next/image";
import GetStarted from "/public/images/GetStarted.svg";

const HomePage: React.FC = () => {
  const [links, setLinks] = useState([
    { platform: "GitHub", url: "https://github.com/benwright" },
    { platform: "YouTube", url: "https://youtube.com/benwright" },
    // { platform: "LinkedIn", url: "https://linkedin.com/in/benwright" },
  ]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-light-grey p-6">
        <Header />
        <main className="flex flex-col md:flex-row gap-6">
          <Sidebar />
          <div className="w-full md:w-3/5 py-4">
            <div className="bg-white p-10 shadow-md rounded-xl">
              <h2 className="text-3xl font-bold text-dark-grey mb-4">
                Customize your links
              </h2>
              <p className="text-grey text-base font-normal mb-8">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
              <button className="w-full text-base font-semibold p-[11px_27px] border border-purple text-purple rounded-lg mb-6">
                + Add new link
              </button>
              {links.length > 0 ? (
                links.map((link, index) => (
                  <div
                    key={index}
                    className="mb-4 bg-light-grey p-5 rounded-xl"
                  >
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
                      // value={value}
                      // onChange={onChange}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-5 rounded-lg gap-6 bg-light-grey mb-6">
                  <Image
                    src={GetStarted}
                    width={250}
                    height={160}
                    alt="Get started"
                  />
                  <h2 className="text-3xl font-bold text-dark-grey">
                    Let&apos;s get you started
                  </h2>
                  <p className="text-grey text-base font-normal mb-8 text-center max-w-[488px]">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them.
                    We&apos;re here to help you share your profiles with
                    everyone!
                  </p>
                </div>
              )}

              <button className="px-4 py-2 bg-purple text-white rounded-lg flex ml-auto">
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
