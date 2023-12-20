import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserWithProvider } from "./actions/user.action";
import User from "./model/user.model";

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      try {
        await createUserWithProvider({
          user: {
            name: user?.user?.name!,
            email: user?.user?.email!,
            image: user?.user?.image!,
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
});
