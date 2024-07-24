import Link from "next/link";
import React from "react";
import Sidebar from "../components/Sidebar";

const PreviewPage: React.FC = () => {
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
    </div>
  );
};

export default PreviewPage;
