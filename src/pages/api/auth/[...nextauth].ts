import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextApiHandler } from "next";
import { db } from "../../../../db/db";
import { usersTable } from "../../../../db/schema";
import { sql } from "drizzle-orm";
import { compareSync } from "bcrypt-ts";

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

        try {
          const user = await db
            .select()
            .from(usersTable)
            .where(sql`${usersTable.email} = ${email}`);

          if (user.length <= 0) {
            return null;
          }

          if (!compareSync(password, user[0].password)) {
            return null;
          }

          return {
            id: user[0].id.toString(),
            name: user[0].name,
            email: user[0].email,
            image: user[0].image || "",
            connectToGoogle: user[0].connectToGoogle,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
};
const Handler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default Handler;
