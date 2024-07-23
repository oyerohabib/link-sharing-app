import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import DevLinkLogo from "/public/images/devLinkLogo.svg";

const instrumentsans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App - oyerohabib",
  description: "HNG 11 Frontend Stage 5 task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentsans.className}>
        <div className="min-h-screen bg-gray-100">
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
              <Link href="/profile-details" className="text-gray-700">
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
          <main className="flex flex-col md:flex-row">{children}</main>
        </div>
      </body>
    </html>
  );
}
