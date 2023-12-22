import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserButton, auth } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();
  return (
    <nav className="flex justify-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href="/" className="flex items-center gap-1">
        <p className="flex items-center text-white gap-2">
          <Image
            src="/assets/icons/chatbot.png"
            width={35}
            height={35}
            alt="ai"
          />
        </p>
      </Link>

      <div className="flex justify-between gap-5">
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href={"/sign-in"} className="p-3 bg-slate-400 rounded-sm">
            Sign-In{" "}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
