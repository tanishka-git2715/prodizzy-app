"use client";
import { useState } from 'react';
import Card from '@/components/ui/Card';
import MainLayout from '@/components/layout/MainLayout';
import { MapPin, Link as LinkIcon, User, Layers, Share2, Settings } from 'lucide-react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('user');

    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-heading font-bold text-gradient">Profile</h1>
                    <button className="text-muted-foreground hover:text-foreground">
                        <Settings size={20} />
                    </button>
                </header>

                <div className="px-4 py-6">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary border-4 border-card shadow-xl mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-heading font-bold mb-1">Alex Builder</h1>
                        <p className="text-muted-foreground text-sm mb-4">Full Stack Developer & UI Designer</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                <span>San Francisco</span>
                            </div>
                            <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                <LinkIcon size={14} />
                                <span>alex.dev</span>
                            </a>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-secondary/50 rounded-xl mb-6">
                        <button
                            onClick={() => setActiveTab('user')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'user'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <User size={14} />
                            User
                        </button>
                        <button
                            onClick={() => setActiveTab('project')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'project'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Layers size={14} />
                            Projects
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4">
                        <Card className="hover:border-primary/20 animate-slide-up" style={{ animationDelay: '0s' }}>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base font-bold">About</h3>
                                <button className="text-muted-foreground hover:text-primary transition-colors">
                                    <Share2 size={16} />
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Passionate about building tools that help other developers be more productive. Currently working on a new SaaS platform for project management.
                            </p>
                        </Card>

                        <Card className="hover:border-primary/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <h3 className="text-base font-bold mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Next.js', 'Node.js', 'UI Design', 'TypeScript', 'Tailwind'].map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-medium border border-transparent hover:border-border transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
