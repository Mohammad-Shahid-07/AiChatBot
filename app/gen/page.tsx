import CodesTable from "@/components/CodesTable";
import GenCodeBtn from "@/components/GenCodeBtn";
import { getUserByClrekId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId: clerkId } = auth();
  const user = await getUserByClrekId(clerkId!);
  if (!user.admin) redirect("/");
  return (
    <div className=" pt-24 pl-5 ">
      <GenCodeBtn />
      <CodesTable />
    </div>
  );
};

export default Page;
