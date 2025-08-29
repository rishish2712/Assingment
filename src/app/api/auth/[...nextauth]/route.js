import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Apple from 'next-auth/providers/apple'
import Credentials from 'next-auth/providers/credentials'

const demoUser = { id: '1', email: 'johndoe@gmail.com', password: 'secret123' }

export const authOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        if (
          creds?.email === demoUser.email &&
          creds?.password === demoUser.password
        ) {
          return { id: demoUser.id, email: demoUser.email }
        }
        return null // invalid -> NextAuth fails sign-in
      },
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return baseUrl + url
      return baseUrl + '/dashboard'
    },
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
