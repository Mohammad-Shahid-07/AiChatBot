
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUserSession = async () => {
  const authUserSession = await getServerSession(authOptions);
  return authUserSession?.user;
};
