"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Plus, BookOpen, User, Zap, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: Plus, label: 'Create', path: '/create' },
        { icon: BookOpen, label: 'Resources', path: '/resources' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background hidden lg:flex flex-col p-6 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25">
                    <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Prodizzy
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2">
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
            <div className="mt-auto pt-6 border-t border-border flex flex-col gap-2">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>

                {/* User Profile Snippet */}
                <div className="mt-4 flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                        <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Alex Builder</p>
                        <p className="text-xs text-muted-foreground truncate">@alexbuilds</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
