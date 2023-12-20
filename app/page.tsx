import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 p-5 text-center  ">
      <span className="gradient" />
      <h1 className="md:text-5xl text-3xl  font-black ">
        <span className="gradient-text-1"> Chat With</span>{" "}
        <span className="gradient-text-2">Ai Like </span>{" "}
        <span className="gradient-text-1"> Your Friend</span>
      </h1>
      <Link
        href="/chat"
        className="text-2xl font-black mt-5 border rounded-md border-gray-500 text-white  p-2"
      >
        Speak To Your Ai
      </Link>
    </div>
  );
}
