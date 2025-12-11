"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MainLayout from "@/components/layout/MainLayout";
import { MapPin, Link as LinkIcon, Calendar, Layers, Bookmark, Users, ArrowBigUp } from 'lucide-react';
import Link from 'next/link';
import { supabase } from "@/utils/supabase/client";
import { mockUser, mockProjects } from '@/data/mockData';

const PublicProfile = () => {
    const params = useParams(); // Get ID from URL
    const router = useRouter();
    const userId = params.id;

    const [activeTab, setActiveTab] = useState('projects');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProjects, setUserProjects] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const tags = [
        { icon: null, label: 'Full-Stack', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { icon: null, label: 'Product', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { icon: null, label: 'AI/ML', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                // Check if current user is viewing (for "Edit" button visibility later maybe)
                const { data: { user } } = await supabase.auth.getUser();
                setCurrentUser(user);

                if (!userId) {
                    setLoading(false);
                    return;
                }

                // 0. Check for Mock User (Tanishka)
                if (userId === mockUser.id) {
                    setProfile({
                        full_name: mockUser.name,
                        headline: mockUser.headline,
                        location: mockUser.location,
                        avatar_url: mockUser.avatar,
                        linkedin_url: mockUser.socials.linkedin,
                        created_at: new Date().toISOString() // Or fixed date
                    });

                    // Filter mock projects for this user
                    const tanishkaProjects = mockProjects
                        .filter(p => p.author.name === mockUser.name)
                        .map(p => ({
                            ...p,
                            image_url: p.image // Map 'image' (mock) to 'image_url' (DB schema)
                        }));
                    setUserProjects(tanishkaProjects);
                    setLoading(false);
                    return;
                }

                // 1. Fetch Profile
                const { data: profileData, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (profileData) {
                    setProfile(profileData);
                } else {
                    // Fallback for "unknown" user or if query failed
                    setProfile({
                        full_name: 'Unknown User',
                        headline: 'Prodizzy Member',
                        avatar_url: null,
                        location: 'Unknown',
                        created_at: new Date().toISOString()
                    });
                }

                // 2. Fetch Projects
                const { data: projectsData } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('author_id', userId);

                if (projectsData) {
                    setUserProjects(projectsData);
                }

            } catch (err) {
                console.error("Error fetching public profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchProfile();
    }, [userId]);


    if (loading) return <MainLayout><div className="flex justify-center p-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div></MainLayout>;

    // If we're redirected seamlessly from /profile (my profile) to here with my ID, it works the same.

    return (
        <MainLayout>
            <div className="w-full mx-auto px-4 py-2 pb-20 relative animate-in fade-in duration-500">

                {/* Header Profile Info */}
                <div className="flex flex-col items-center text-center mb-6 mt-10">
                    <div className="relative mb-4 group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted relative">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground bg-secondary">
                                    {(profile?.full_name || 'U')[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">{profile?.full_name}</h1>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4 leading-relaxed">
                        {profile?.headline || 'No headline yet'}
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
                            <span>{profile?.location || 'Unknown Location'}</span>
                        </div>
                        {profile?.linkedin_url && (
                            <Link href={profile.linkedin_url} target="_blank" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                <LinkIcon size={14} />
                                <span>LinkedIn</span>
                            </Link>
                        )}
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>Joined {profile?.created_at ? new Date(profile.created_at).toLocaleString('default', { month: 'short', year: 'numeric' }) : 'Recently'}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Box */}
                <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-2xl bg-card/50 mb-8 overflow-hidden">
                    <div className="p-4 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                        <div className="text-xl font-bold mb-1">{userProjects.length}</div>
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
                        userProjects.map((project, i) => (
                            <button
                                key={i}
                                type="button"
                                className="flex flex-col gap-2 group cursor-pointer block relative z-10 w-full text-left"
                            >
                                <div className="aspect-square relative overflow-hidden bg-secondary rounded-xl border border-border/50">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">No Img</div>
                                    )}
                                </div>
                                <h3 className="text-center text-sm font-medium text-foreground">{project.title}</h3>
                            </button>
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
};

export default PublicProfile;
