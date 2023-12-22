import { CodeModal } from "@/components/CodeModal";
import SpeakUi from "@/components/SpeakUi";
import { getUserByEmail } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Page = async () => {
  const userSession = await getServerSession(authOptions);
  if (!userSession) redirect("/api/auth/signin");
  const mongoUser = await getUserByEmail(userSession?.user?.email!);
  const code = mongoUser?.code;

  return (
    <>
      <div className="flex flex-wrap justify-between pt-20">
        {mongoUser?.admin && (
          <Link
            href="/gen"
            className="bg-[#0f1628] p-2 m-5 text-green-500 rounded-sm"
          >
            Generate More Codes
          </Link>
        )}
        <CodeModal />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <SpeakUi user={JSON.stringify(userSession?.user)} code={code} />
      </div>
    </>
  );
};

export default Page;
