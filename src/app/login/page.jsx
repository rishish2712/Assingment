"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function onCredentials(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // handle redirect manually
            callbackUrl: "/dashboard",
        });
        setLoading(false);
        if (res?.ok) router.push("/dashboard");
        else setError("Wrong ID or password");
    }

    return (
        <div className="min-h-screen grid place-items-center bg-[#f6f7fb] px-4"> {/* centered at any size */} {/* responsive centering */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl">
                <div className="md:flex md:items-stretch">
                    {/* Left brand panel (hidden on mobile) */}
                    <aside className="relative hidden md:flex md:w-1/5 xl:w-1/4">
                        <div className="absolute inset-0 bg-[#635bff]" />
                        <div className="absolute inset-y-0 -right-10 w-19 bg-[#635bff] skew-x-[-9deg]" />
                        <div className="relative z-10 flex flex-col justify-center px-8">
                            <div className="absolute top-8 left-8 h-11 w-11 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="h-5 w-5 rounded-full border-2 border-white/85 inline-block" />
                            </div>
                            <h1 className="text-white text-5xl font-semibold tracking-wide">BASE</h1>
                            <div className="absolute bottom-6 left-8 flex items-center gap-6 text-white/90">
                                <a aria-label="GitHub" href="http://github.com" className="hover:text-white/70 transition">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.79 1.3 3.47.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.26 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.7.24 2.95.12 3.26.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.61-5.49 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" /></svg>
                                </a>
                                <a aria-label="Twitter" href="http://x.com" className="hover:text-white/70 transition">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.5c-.8.35-1.7.58-2.6.69.94-.56 1.65-1.45 1.99-2.5-.88.52-1.86.9-2.9 1.1A4.48 4.48 0 0 0 12.1 6.8a12.72 12.72 0 0 1-9.24-4.7 4.48 4.48 0 0 0 1.39 6 4.46 4.46 0 0 1-2.03-.56v.06c0 2.16 1.54 3.96 3.58 4.37-.37.1-.76.15-1.16.15-.28 0-.56-.03-.83-.08.56 1.76 2.19 3.04 4.12 3.08A8.98 8.98 0 0 1 1 18.5a12.67 12.67 0 0 0 6.88 2.02c8.27 0 12.79-6.85 12.79-12.79l-.01-.58A9.1 9.1 0 0 0 23 4.5z" /></svg>
                                </a>
                                <a aria-label="LinkedIn" href="http://linkedin.com" className="hover:text-white/70 transition">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.5 8.98h2.96V21H3.5V8.98zM9.5 8.98h2.83v1.64h.04c.39-.74 1.36-1.52 2.8-1.52 2.99 0 3.55 1.97 3.55 4.53V21h-2.96v-5.41c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.41-2.08 2.86V21H9.5V8.98z" /></svg>
                                </a>
                                <a aria-label="Discord" href="http://discord.com" className="hover:text-white/70 transition">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A18 18 0 0 0 15.9 3l-.22.44a15.5 15.5 0 0 1 3.3 1.06 10.7 10.7 0 0 0-9.96 0 15.5 15.5 0 0 1 3.3-1.06L12.1 3c-1.6.05-3.2.3-4.7.76A12 12 0 0 0 2 17.6c2.02 1.5 4.25 2.6 6.63 3.3l.5-1.6c-.9-.3-1.76-.67-2.58-1.12l.6-.38c1.67.77 3.5 1.17 5.35 1.17s3.68-.4 5.35-1.17l.6.38c-.82.45-1.68.82-2.58 1.12l.5 1.6a17.4 17.4 0 0 0 6.63-3.3 12 12 0 0 0-3.3-13.2zM9.4 14.3c-.65 0-1.18-.72-1.18-1.6 0-.88.53-1.6 1.18-1.6.65 0 1.18.72 1.18 1.6 0 .88-.53 1.6-1.18 1.6zm5.2 0c-.65 0-1.18-.72-1.18-1.6 0-.88.53-1.6 1.18-1.6s1.18.72 1.18 1.6c0 .88-.53 1.6-1.18 1.6z" /></svg>
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Right form panel */}
                    <main className="flex-1 flex items-center justify-center p-5 md:p-8">
                        <div className="w-full max-w-sm sm:max-w-md">
                            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-7 ring-1 ring-black/5">
                                <h2 className="text-3xl font-semibold text-gray-900">Sign In</h2>
                                <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>

                                <div className="mt-5 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#635bff]"
                                    >
                                        <img alt="" className="h-4 w-4" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                                        Sign in with Google
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#635bff]"
                                    >
                                        <img alt="" className="h-4 w-4" src="https://www.svgrepo.com/show/452210/apple.svg" />
                                        Sign in with Apple
                                    </button>
                                </div>

                                <form className="mt-5 space-y-4" method="post" onSubmit={onCredentials}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]"
                                            placeholder="johndoe@gmail.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]"
                                        />
                                    </div>

                                    {error && <p className="text-sm text-red-600">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-lg bg-[#635bff] px-4 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-60"
                                    >
                                        {loading ? "Signing in…" : "Sign In"}
                                    </button>
                                </form>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-600">
                                Don’t have an account?{" "}
                                <a href="#" className="font-medium text-[#635bff] hover:text-indigo-500">Register here</a>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
