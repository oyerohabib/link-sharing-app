import Image from "next/image";
import Link from "next/link";
import DevLinkLogoLg from "/public/images/devLinkLogo.svg";
import DevLinkLogoSm from "/public/images/favicon.svg";
import { usePathname } from "next/navigation";
import { IoPersonCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { logOut, user } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl">
      <div className="flex items-center">
        <Link href={"/"} className="mr-auto">
          <Image
            src={DevLinkLogoLg}
            alt="Devlinks"
            className="mr-2 sm:h-[40px] lg:w-[183px] h-[28px] w-[125px] hidden sm:block"
          />
          <Image
            src={DevLinkLogoSm}
            alt="Devlinks"
            className="mr-2 h-[40px] block sm:hidden"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-3 transition duration-200">
        <Link
          href="/"
          className={`flex items-center gap-2 font-semibold text-base ${
            pathname === "/"
              ? "md:p-[11px_24px] sm:p-[6px_15px] p-[11px_27px] bg-light-purple rounded-lg text-purple"
              : "text-grey hover:text-purple"
          }`}
        >
          <span>
            <FaLink />
          </span>
          <span className="hidden sm:block">Links</span>
        </Link>
        <Link
          href="/profile-detail"
          className={`flex items-center gap-2 font-semibold text-base ${
            pathname === "/profile-detail"
              ? "md:p-[11px_24px] sm:p-[6px_15px] p-[11px_27px] bg-light-purple rounded-lg text-purple"
              : "text-grey hover:text-purple"
          }`}
        >
          <span>
            <IoPersonCircleOutline />
          </span>
          <span className="hidden sm:block">Profile Details</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/preview?userId=${user.uid}`}
          className="flex items-center gap-2 md:px-4 md:py-2 xs:px-3 xs:py-1 p-[11px_16px] text-purple text-base font-semibold rounded-lg border border-purple hover:bg-light-purple transition duration-200"
        >
          <span>
            <AiOutlineEye />
          </span>
          <span className="hidden sm:block">Preview</span>
        </Link>
        <span
          title="Logout"
          className="flex items-center gap-2 md:px-4 md:py-2 xs:px-3 xs:py-2 p-[11px_16px] rounded-lg border text-purple border-purple hover:bg-light-purple transition duration-200 cursor-pointer"
          onClick={logOut}
        >
          <span>
            <IoLogOutOutline />
          </span>
          <span className="hidden md:block">Logout</span>
        </span>
      </div>
    </header>
  );
}
