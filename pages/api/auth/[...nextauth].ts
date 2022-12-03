import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getKeys } from "../../../helper/encryption-helpers";
import { getDummyUser, User } from "../../../models/user-model";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 60 * 60,
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        try {
          const { privateKey, publicKey } = getKeys();

          const user: User = getDummyUser(publicKey, privateKey);

          if (user !== null) {
            return user;
          }

          return null;
        } catch (e: any) {
          throw new Error(e.message ?? "Login Failed!");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    session: async ({ session, token }) => {
      session.user = token.user;

      return session;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },

  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
