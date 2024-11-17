import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextApiHandler } from "next";

interface Credentials {
  email: string;
  password: string;
}
export interface MySession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    connectToGoogle: boolean;
  };
}
export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      try {
        return session;
      } catch (error) {
        return session;
      }
    },
    async signIn({ user, account, profile }) {
      try {
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  secret: process.env.NEXT_SECRET,
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;
        return {
          id: "sdfg",
          name: "sdfg",
          email: "asdefrg",
        };
      },
    }),
  ],
};
const Handler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default Handler;
