import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import { createUserWithProvider } from "@/lib/actions/user.action";
import NextAuth from "next-auth/next";
import User from "@/lib/model/user.model";

export interface CredentialsProps {
  email: string;
  password: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async signIn(user) {
      try {
        await createUserWithProvider({
          user: {
            name: user?.user?.name!,
            email: user?.user?.email!,
            image: user?.user?.image!,
          },
          account: user.account,
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    session: async ({ session }) => {
      const user = await User.findOne({ email: session?.user?.email });
      if (!user) {
        return session;
      }
      session.user = {
        ...(session.user as {
          name?: string;
          email?: string;
          image?: string;
          id?: string;
        }),
        id: user._id.toString(),
      };

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
