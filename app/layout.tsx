import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Wave",
  description:
    "Chat Wave is an AI powered chat application that allows you to have a Hands-Free conversation with an AI. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#090816] h-screen`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
