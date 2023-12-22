import { CodeModal } from "@/components/CodeModal";
import SpeakUi from "@/components/SpeakUi";
import { getUserByClrekId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

import React from "react";

const Page = async () => {
  const { userId: clrekId } = auth();
  const mongoUser = await getUserByClrekId(clrekId!);

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
        {!mongoUser?.code && <CodeModal />}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <SpeakUi user={JSON.stringify(mongoUser?._id)} code={mongoUser?.code} />
      </div>
    </>
  );
};

export default Page;
