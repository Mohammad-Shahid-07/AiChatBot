import { createUserWithProvider } from "@/lib/actions/user.action";
import User from "@/lib/model/user.model";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
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
export { handler as GET, handler as POST, authOptions };
