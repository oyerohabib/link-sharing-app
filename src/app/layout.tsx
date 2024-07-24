import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";

const instrumentsans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App - oyerohabib",
  description: "HNG 11 Frontend Stage 5 task",
  icons: [
    {
      rel: "icon",
      url: "/images/favicon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentsans.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
