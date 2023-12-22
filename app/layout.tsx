import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#090816] h-screen`}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
