'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);
                router.push('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-6">
                    <Link href="/" className="inline-block">
                        <div className="text-4xl font-bold mb-2">
                            <span className="text-[#232F3E]">a</span>
                            <span className="text-[#FF9900]">zon</span>
                            <span className="text-xs align-top text-[#FF9900]">.in</span>
                        </div>
                    </Link>
                </div>

                {/* Login form */}
                <div className="border border-gray-300 rounded p-5">
                    <h1 className="text-2xl font-normal mb-4">Sign in</h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                            ⚠ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold mb-1">
                                Email or mobile phone number
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-400 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-400 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#c7c11e] rounded text-black text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    {/* Terms */}
                    <p className="text-xs text-gray-600 mt-4">
                        By continuing, you agree to Azon's{' '}
                        <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">
                            Conditions of Use
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">
                            Privacy Notice
                        </a>
                        .
                    </p>
                </div>

                {/* New customer */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">New to Azon?</span>
                        </div>
                    </div>

                    <Link
                        href="/register"
                        className="mt-4 block w-full py-2 bg-[#F0F2F2] hover:bg-[#e7e9ec] border border-gray-400 rounded text-black text-sm text-center transition-colors"
                    >
                        Create your Azon account
                    </Link>
                </div>
            </div>
        </div>
    );
}
