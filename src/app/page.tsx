"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InputField from "./components/InputField";
import { FiLink } from "react-icons/fi";
import InputSelect from "./components/InputSelect";
import ProtectedRoute from "./components/ProtectedRoute";
import Image from "next/image";
import GetStarted from "/public/images/GetStarted.svg";
import { FaGripLines } from "react-icons/fa";
import { db } from "./firebase/clientApp";
import { useAuth } from "./context/AuthContext";
import { Link } from "@/app/types";
import { fetchLinks, addLink, removeLink } from "./auth/lib/firebase";

const HomePage: React.FC = () => {
  // const [links, setLinks] = useState([
  //   { id: 1, platform: "GitHub", url: "https://github.com/benwright" },
  //   { id: 2, platform: "YouTube", url: "https://youtube.com/benwright" },
  //   { id: 3, platform: "LinkedIn", url: "https://linkedin.com/in/benwright" },
  // ]);

  const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newLink, setNewLink] = useState<Link>({ platform: "", url: "" });

  const addNewLink = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const getLinks = async () => {
      if (user?.uid) {
        const userLinks = await fetchLinks(db, user.uid);
        setLinks(userLinks);
      }
    };
    getLinks();
  }, [user?.uid]);

  const handleAddLink = async () => {
    if (newLink.platform && newLink.url) {
      await addLink(user.uid, newLink);
      setLinks([...links, newLink]);
      setIsEditing(false);
      setNewLink({ platform: "", url: "" });
    } else {
      console.error("Invalid link data");
    }
  };

  const handleRemoveLink = async (platform: string) => {
    const linkToRemove = links.find((link) => link.platform === platform);
    if (linkToRemove) {
      await removeLink(user.uid, linkToRemove);
      setLinks(links.filter((link) => link.platform !== platform));
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleNewLinkChange = (field: string, value: string) => {
    console.log(field, value);
    console.log("newLink", newLink);
    setNewLink({ ...newLink, [field]: value });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-light-grey p-4 sm:p-6">
        <Header />
        <main className="flex flex-col md:flex-row gap-6">
          <Sidebar />
          <div className="w-full lg:w-3/5 py-4">
            <div className="bg-white p-6 sm:p-10 shadow-md rounded-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark-grey mb-4">
                Customize your links
              </h2>
              <p className="text-grey text-base font-normal mb-8">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
              <button
                className="w-full text-base font-semibold p-[11px_27px] border border-purple text-purple hover:bg-light-purple transition duration-200 rounded-lg mb-6"
                onClick={addNewLink}
              >
                + Add new link
              </button>
              {links.length > 0 &&
                links.map((link, index) => (
                  <div
                    key={index}
                    className="mb-4 bg-light-grey p-5 rounded-xl"
                  >
                    <div className="flex items-center justify-between text-grey mb-3">
                      <span className="flex gap-2 items-center">
                        <FaGripLines className="inline-block" />
                        Link #{index + 1}
                      </span>
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => handleRemoveLink(link.platform)}
                      >
                        Remove
                      </span>
                    </div>
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
                      value={link.url}
                      onChange={(e) =>
                        handleInputChange(index, "url", e.target.value)
                      }
                    />
                  </div>
                ))}

              {isEditing || links.length > 0 ? (
                <div className="mb-6 bg-light-grey p-5 rounded-xl">
                  <div className="flex items-center justify-between text-grey mb-3">
                    <span className="flex gap-2 items-center">
                      <FaGripLines className="inline-block" />
                      Link #1
                    </span>
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => setIsEditing(false)}
                    >
                      Remove
                    </span>
                  </div>
                  <InputSelect
                    label="Platform"
                    value={newLink?.platform || ""}
                    onChange={(newValue) =>
                      handleNewLinkChange("platform", newValue)
                    }
                  />
                  <InputField
                    id="url"
                    name="url"
                    type="url"
                    required
                    label="Link"
                    placeholder="Enter your Link"
                    icon={FiLink}
                    value={newLink?.url || ""}
                    onChange={(e) => handleNewLinkChange("url", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-5 rounded-lg gap-6 bg-light-grey mb-6">
                  <Image
                    src={GetStarted}
                    width={250}
                    height={160}
                    alt="Get started"
                  />
                  <h2 className="text-2xl xs:text-3xl font-bold text-dark-grey">
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

              {(isEditing || links.length > 0) && (
                <button
                  className="px-6 py-3 bg-purple text-white rounded-lg flex ml-auto"
                  onClick={handleAddLink}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
