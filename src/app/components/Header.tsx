import Image from "next/image";
import Link from "next/link";
import DevLinkLogo from "/public/images/devLinkLogo.svg";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src={DevLinkLogo}
          width={183}
          height={40}
          alt="Devlinks"
          className="mr-2"
        />
      </div>
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-700">
          Links
        </Link>
        <Link href="/profile-detail" className="text-gray-700">
          Profile Details
        </Link>
      </div>
      <Link
        href="/preview"
        className="px-4 py-2 text-white bg-purple-500 rounded"
      >
        Preview
      </Link>
    </header>
  );
}
