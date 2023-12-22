import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-white max-w-screen-xl mx-auto  flex justify-between mb-10 w-full gap-y-10 border-t border-black-400 bg-black-100 px-20 py-1 max-md:flex-col ">
      {" "}
      <p>
        Created with ❤️ by  {" "}
        <Link
          href="https://www.mohammadshahid.vercel.app"
          target="_blank"
          className="text-blue-500"
        >
          Mohammad Shahid
        </Link>
      </p>
      <div className="flex gap-x-9">
        <Link
          href="https://www.linkedin.com/in/mohammad-07-shahid/"
          target="_blank"
        >
          <Image
            src="/assets/icons/linkedin.svg"
            alt="linkedin"
            width={30}
            height={30}
          />
        </Link>
        <Link href="https://github.com/Mohammad-Shahid-07" target="_blank">
          <Image
            src="/assets/icons/git.svg"
            alt="github"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
