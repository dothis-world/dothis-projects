import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import * as process from 'process';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
   
  ],
};

export default NextAuth(authOptions);
