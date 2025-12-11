"use client";
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Error logging in with Google:', error.message);
            alert('Error logging in with Google');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <span className="text-xl font-bold">Prodizzy</span>
            </Link>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm w-full max-w-md text-center">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-200 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    )}
                    <span>Continue with Google</span>
                </button>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    );
}
