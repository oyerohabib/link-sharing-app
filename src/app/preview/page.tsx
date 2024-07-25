import Link from "next/link";
import React from "react";
import Sidebar from "../components/Sidebar";

const PreviewPage: React.FC = () => {
  return (
    <div className="min-h-screen xs:bg-light-grey flex flex-col">
      <header className="w-full xs:h-[357px] p-6 xs:bg-purple rounded-[0_0_32px_32px] relative">
        <div className="w-full xs:bg-white flex justify-between xs:p-4 rounded-lg font-semibold">
          <Link href={"/"}>
            <button className="px-4 py-2 border border-purple text-purple rounded-lg hover:bg-light-purple transition duration-200">
              Back to Editor
            </button>
          </Link>
          <button className="ml-4 px-4 py-2 bg-purple text-white rounded-lg">
            Share Link
          </button>
        </div>
      </header>
      <Sidebar
        width={"sm:w-[450px] w-3/4"}
        padding={"sm:py-12 sm:px-14 xs:py-8 xs:px-6 py-8"}
        className={"mx-auto relative xs:mt-[-170px]"}
        shadow={"xs:shadow-md"}
      />
    </div>
  );
};

export default PreviewPage;
