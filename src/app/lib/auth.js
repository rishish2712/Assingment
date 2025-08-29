'use client'
import { signIn, signOut } from 'next-auth/react'

export const signInWithGoogle = () =>
  signIn('google', { callbackUrl: '/dashboard' })
export const signInWithApple = () =>
  signIn('apple', { callbackUrl: '/dashboard' })
export const signInWithCredentials = async (email, password) => {
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    })
    return res
  } catch (e) {
    throw e
  }
}
export const doSignOut = () => signOut({ callbackUrl: '/login' })
