"use client";
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MapPin, Link as LinkIcon, Calendar, Settings, Wrench, Palette, Bot, Layers, Bookmark, Users } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('projects');

    const tags = [
        { icon: Wrench, label: 'Full-Stack', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { icon: Palette, label: 'Product', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { icon: Bot, label: 'AI/ML', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    ];

    // Mock projects for the grid
    const projects = [
        { name: "Chordy", image: "/chordy_logo.jpg" },
        { name: "Carbonzy", image: "/carbonzy_logo.jpg" },
        { name: "Bluuroom", image: "/bluuroom_logo.png" },
    ];

    return (
        <MainLayout>
            <div className="w-full mx-auto px-4 py-2 pb-20">
                {/* Top Nav (Desktop Only - Restored) */}
                <div className="hidden lg:flex justify-end mb-4">
                    <button className="text-muted-foreground hover:text-foreground p-2">
                        <Settings size={20} />
                    </button>
                </div>

                {/* Header Profile Info */}
                <div className="flex flex-col items-center text-center mb-6 mt-4">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                            <img src="/tanishka_avatar.png" alt="Tanishka" className="w-full h-full object-cover" />
                        </div>
                        {/* Status Dot */}
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-background"></div>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">Tanishka</h1>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4 leading-relaxed">
                        Building products that solve real problems
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {tags.map((tag) => (
                            <div key={tag.label} className={`flex items-center px-3 py-1.5 rounded-full ${tag.bg} border border-border/50`}>
                                <span className={`text-xs font-medium ${tag.color}`}>{tag.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground mb-8">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>Delhi, India</span>
                        </div>
                        <Link href="https://www.linkedin.com/in/tanishka2712/" target="_blank" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <LinkIcon size={14} />
                            <span>LinkedIn</span>
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>Joined Dec, 2025</span>
                        </div>
                    </div>
                </div>

                {/* Stats Box */}
                <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-2xl bg-card/50 mb-8 overflow-hidden">
                    <div className="p-4 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                        <div className="text-xl font-bold mb-1">3</div>
                        <div className="text-xs text-muted-foreground font-medium">Projects</div>
                    </div>
                    <div className="p-4 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                        <div className="text-xl font-bold mb-1">0</div>
                        <div className="text-xs text-muted-foreground font-medium">Followers</div>
                    </div>
                    <div className="p-4 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                        <div className="text-xl font-bold mb-1">0</div>
                        <div className="text-xs text-muted-foreground font-medium">Following</div>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <button className="w-full py-3 rounded-xl border border-border bg-card hover:bg-secondary/50 font-medium text-sm transition-all mb-10">
                    Edit Profile
                </button>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-1 border-b border-border/50 mb-6 w-full">
                    {[
                        { id: 'projects', label: 'Projects', icon: Layers },
                        { id: 'saved', label: 'Saved', icon: Bookmark },
                        { id: 'collabs', label: 'Collabs', icon: Users },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center gap-2 pb-3 pt-2 text-sm font-medium border-b-2 transition-all w-full ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <tab.icon size={16} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
                    {activeTab === 'projects' && (
                        projects.map((project, i) => (
                            <div key={i} className="flex flex-col gap-2 group cursor-pointer">
                                <div className="aspect-square relative overflow-hidden bg-secondary rounded-xl border border-border/50">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">View</span>
                                    </div>
                                </div>
                                <h3 className="text-center text-sm font-medium text-foreground">{project.name}</h3>
                            </div>
                        ))
                    )}
                    {activeTab !== 'projects' && (
                        <div className="col-span-full py-20 text-center text-muted-foreground">
                            <p>No content yet</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
