"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { Home, Search, Plus, BookOpen, User } from 'lucide-react';

import ThemeToggle from '../ui/ThemeToggle';

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? styles.active : '';

    return (
        <>
            {/* Desktop Top Navigation - Hidden as we now use Sidebar */}
            <nav className={`${styles.navContainer} lg:hidden`}>
                <div className={styles.desktopNav}>
                    <Link href="/" className={styles.logo}>Prodizzy</Link>

                    <div className={styles.navLinks}>
                        <Link href="/" className={`${styles.navLink} ${isActive('/')}`}>Home</Link>
                        <Link href="/search" className={`${styles.navLink} ${isActive('/search')}`}>Search</Link>
                        <Link href="/create" className={`${styles.navLink} ${isActive('/create')}`}>Post</Link>
                        <Link href="/resources" className={`${styles.navLink} ${isActive('/resources')}`}>Explore</Link>
                        <Link href="/profile" className={`${styles.navLink} ${isActive('/profile')}`}>Profile</Link>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button className="btn btn-secondary" style={{ height: '40px', fontSize: '14px' }}>Log In</button>
                        <button className="btn btn-primary" style={{ height: '40px', fontSize: '14px' }}>Sign Up</button>
                    </div>
                </div>
            </nav>

            {/* Mobile Top Header */}
            <div className={styles.mobileHeader}>
                <div className="flex items-center gap-3">
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src="/logo.jpg" alt="Prodizzy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span className="text-xl font-bold text-white font-heading">Prodizzy</span>
                </div>
                <ThemeToggle />
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className={styles.mobileNav}>
                <Link href="/" className={`${styles.mobileNavItem} ${isActive('/')}`}>
                    <Home size={24} />
                    <span>Home</span>
                </Link>
                <Link href="/search" className={`${styles.mobileNavItem} ${isActive('/search')}`}>
                    <Search size={24} />
                    <span>Search</span>
                </Link>
                <Link href="/create" className={styles.mobileCreateBtn}>
                    <Plus size={32} />
                </Link>
                <Link href="/resources" className={`${styles.mobileNavItem} ${isActive('/resources')}`}>
                    <BookOpen size={24} />
                    <span>Explore</span>
                </Link>
                <Link href="/profile" className={`${styles.mobileNavItem} ${isActive('/profile')}`}>
                    <User size={24} />
                    <span>Profile</span>
                </Link>
            </nav>
        </>
    );
}
