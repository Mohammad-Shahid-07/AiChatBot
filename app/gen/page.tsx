import CodesTable from "@/components/CodesTable";
import GenCodeBtn from "@/components/GenCodeBtn";
import { getUserByEmail } from "@/lib/actions/user.action";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const userSession = await getUserSession();
  if(!userSession) redirect('/')
  const mongoUser = await getUserByEmail(userSession?.email!);
  if (!mongoUser.admin) {
    redirect("/");
  }
  return (
    <div className=" pt-24 pl-5 ">
      <GenCodeBtn />
      <CodesTable />
    </div>
  );
};

export default Page;
