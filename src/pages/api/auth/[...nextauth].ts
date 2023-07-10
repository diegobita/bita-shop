import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "@/database";
import type { NextAuthOptions} from 'next-auth'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [

    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@correo.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize(credentials) {

        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
        
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  jwt: {

  },

  session: {
    maxAge: 259200, //30 dias
    strategy: 'jwt',
    updateAge: 86400,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            console.log("oauth")
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      
      //console.log({ session, token, user })
      session.accessToken = token.accessToken as string
      session.user = token.user as any;

      return session;
    }
  }
};

export default NextAuth(authOptions);