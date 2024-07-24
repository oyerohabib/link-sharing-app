import Image from "next/image";
import Link from "next/link";
import DevLinkLogo from "/public/images/devLinkLogo.svg";
import { usePathname } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src={DevLinkLogo}
            width={183}
            height={40}
            alt="Devlinks"
            className="mr-2"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4 transition duration-200">
        <Link
          href="/"
          className={`flex items-center gap-2 font-semibold text-base ${
            pathname === "/"
              ? "p-[11px_27px] bg-light-purple rounded-lg text-purple"
              : "text-grey"
          }`}
        >
          <span>
            <FaLink />
          </span>
          Links
        </Link>
        <Link
          href="/profile-detail"
          className={`flex items-center gap-2 font-semibold text-base ${
            pathname === "/profile-detail"
              ? "p-[11px_27px] bg-light-purple rounded-lg text-purple"
              : "text-grey"
          }`}
        >
          <span>
            <IoPersonCircleOutline />
          </span>
          Profile Details
        </Link>
      </div>
      <Link
        href="/preview"
        className="px-4 py-2 text-purple text-base font-semibold bg-purple-500 rounded-lg border border-purple"
      >
        Preview
      </Link>
    </header>
  );
}
