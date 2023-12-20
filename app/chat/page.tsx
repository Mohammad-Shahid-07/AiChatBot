import SpeakUi from "@/components/SpeakUi";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const runtine = "edge";
const Page = async () => {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  const user = session?.user?.id;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <SpeakUi user={JSON.stringify(user)} />
    </div>
  );
};

export default Page;
