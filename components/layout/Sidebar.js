"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Plus, BookOpen, User, Zap, Settings, LogOut, Layers, Mail, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (path) => pathname === path;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        fetchUser();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/login');
    };

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        ...(user ? [{ icon: Plus, label: 'Post', path: '/create' }] : []),
        { icon: BookOpen, label: 'Explore', path: '/resources' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Layers, label: 'Projects', path: '/projects' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background hidden lg:flex flex-col p-4 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-2 px-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src="/logo.jpg" alt="Prodizzy Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-heading font-bold text-white">
                    Prodizzy
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                            }`}
                    >
                        <item.icon
                            size={20}
                            className={`transition-colors ${isActive(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                }`}
                        />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-2 pt-2 border-t border-border flex flex-col gap-2">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
                    <Mail size={20} />
                    <span>Contact Us</span>
                </button>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                )}
            </div>

            {/* User Profile or Sign In */}
            <div className="mt-auto pt-2 flex items-center px-2">
                {loading ? (
                    <div className="w-full flex justify-center py-2">
                        <div className="h-4 w-4 border-2 border-muted rounded-full animate-spin border-t-transparent"></div>
                    </div>
                ) : user ? (
                    <div className="flex items-center gap-2 w-full">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                            {user.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-bold text-xs text-muted-foreground">
                                    {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">{user.user_metadata?.full_name || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
                    >
                        <LogIn size={18} />
                        <span>Sign In</span>
                    </Link>
                )}
            </div>
        </aside>
    );
}
