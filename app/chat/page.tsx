import { CodeModal } from "@/components/CodeModal";
import SpeakUi from "@/components/SpeakUi";
import { getUserByEmail } from "@/lib/actions/user.action";
import { getUserSession } from "@/lib/session";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await getUserSession();
  if (!user) redirect("/api/auth/signin");
  const mongoUser = await getUserByEmail(user?.email!);
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
        <SpeakUi user={JSON.stringify(user)} code={code} />
      </div>
    </>
  );
};

export default Page;
