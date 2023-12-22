import { createUserWithProvider } from "@/lib/actions/user.action";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No email found");
      }
      try {
        await createUserWithProvider({
          user: {
            name: profile?.name!,
            email: profile?.email!,
            image: profile?.image!,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
