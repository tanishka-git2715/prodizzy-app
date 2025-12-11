"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // The Supabase client automatically parses the hash fragment (#access_token=...)
        // and updates the local session. We just need to wait a moment or check the session
        // and then redirect.
        const handleAuth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                // Successful login
                router.replace('/');
            } else if (error) {
                // Error during auth
                console.error("Auth error:", error);
                router.replace('/login?error=auth-failed');
            } else {
                // If we got here but no session is found immediately, 
                // give the client a moment to process the hash.
                // However, onAuthStateChange in Sidebar/etc usually catches it too.
                // We'll set up a listener here just in case.
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'SIGNED_IN' || session) {
                        router.replace('/');
                    }
                });

                return () => subscription.unsubscribe();
            }
        };

        handleAuth();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground animate-pulse">Completing sign in...</p>
            </div>
        </div>
    );
}
