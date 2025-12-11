"use client";
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MapPin, Link as LinkIcon, Calendar, Settings, Wrench, Palette, Bot, Layers, Bookmark, Users, X, Edit2, Check, Camera } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('projects');
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null); // Start null to avoid flashing wrong data

    // Edit Modal State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Optimistic projects init
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [joinModal, setJoinModal] = useState({ isOpen: false, project: null });

    const tanishkaDefaults = {
        full_name: "Tanishka",
        headline: "Full Stack Developer | Building Prodizzy",
        avatar_url: "/tanishka_avatar.png",
        tags: ['Full-Stack', 'Product', 'AI/ML'],
        location: 'Delhi, India',
        linkedin_url: 'https://www.linkedin.com/in/tanishka2712/',
        created_at: new Date().toISOString() // Fallback
    };

    const tags = [
        { icon: Wrench, label: 'Full-Stack', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { icon: Palette, label: 'Product', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { icon: Bot, label: 'AI/ML', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    ];

    useEffect(() => {
        const fetchProfileData = async () => {
            // 1. Check Auth
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.log("No user found, redirecting");
                router.push('/login');
                return;
            }
            setUser(user);

            // 2. Fetch Profile from Supabase
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            // 3. Logic: Determine Profile Data
            if (profileData) {
                setProfile(profileData);
            } else {
                // No profile in DB. Decide based on email.
                if (user.email === 'tashukhandelwal27@gmail.com') {
                    setProfile({ ...tanishkaDefaults, id: user.id });
                } else {
                    // Generic User Default (using Google Auth Data)
                    setProfile({
                        id: user.id,
                        full_name: user.user_metadata?.full_name || 'New User',
                        headline: 'Joined Prodizzy',
                        avatar_url: user.user_metadata?.avatar_url || null,
                        tags: [],
                        location: 'Earth',
                        created_at: new Date().toISOString()
                    });
                }
            }

            // 4. Fetch Projects
            const { data: projectsData } = await supabase.from('projects').select('*').eq('author_id', user.id);
            if (projectsData && projectsData.length > 0) {
                setMyProjects(projectsData);
            } else if (user.email === 'tashukhandelwal27@gmail.com' && (!projectsData || projectsData.length === 0)) {
                // Keep the static projects for Tanishka ONLY if she has none
                setMyProjects([
                    { id: 'chordy', title: "Chordy", image_url: "/chordy_logo.jpg" },
                    { id: 'carbonzy', title: "Carbonzy", image_url: "/carbonzy_logo.jpg" },
                    { id: 'bluuroom', title: "Bluuroom", image_url: "/bluuroom_logo.png" },
                ]);
            }

            setLoading(false);
        };

        fetchProfileData();
    }, [router]);


    const handleEditClick = () => {
        setEditForm(profile); // Initialize form with current profile data
        setIsEditing(true);
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (!user) return;

            const updates = {
                id: user.id,
                full_name: editForm.full_name,
                headline: editForm.headline,
                location: editForm.location,
                // Keep existing avatar, do not allow update
                avatar_url: profile.avatar_url,
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;

            setProfile({ ...profile, ...updates });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Error updating profile: ${error.message || error.error_description || JSON.stringify(error)}`);
        } finally {
            setIsSaving(false);
        }
    };


    if (loading) return <MainLayout><div className="flex justify-center p-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div></MainLayout>;

    return (
        <MainLayout>
            <div className="w-full mx-auto px-4 py-2 pb-20 relative animate-in fade-in duration-500">
                {/* Top Nav */}
                <div className="hidden lg:flex justify-end mb-4">
                    <button className="text-muted-foreground hover:text-foreground p-2">
                        <Settings size={20} />
                    </button>
                </div>

                {/* Header Profile Info */}
                <div className="flex flex-col items-center text-center mb-6 mt-4">
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
                        {/* Status Dot */}
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-background"></div>
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
                            {/* Parse date safely */}
                            <span>Joined {profile?.created_at ? new Date(profile.created_at).toLocaleString('default', { month: 'short', year: 'numeric' }) : 'Recently'}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Box */}
                <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-2xl bg-card/50 mb-8 overflow-hidden">
                    <div className="p-4 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                        <div className="text-xl font-bold mb-1">{myProjects.length}</div>
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
                <button
                    onClick={handleEditClick}
                    className="w-full py-3 rounded-xl border border-border bg-card hover:bg-secondary/50 font-medium text-sm transition-all mb-10 flex items-center justify-center gap-2"
                >
                    <Edit2 size={16} />
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
                        myProjects.map((project, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => {
                                    console.log("Card clicked!", project.title);
                                    setJoinModal({ isOpen: true, project });
                                }}
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
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">Join Team</span>
                                    </div>
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

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Edit Profile</h3>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSaveProfile} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={editForm.full_name || ''}
                                        onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Headline</label>
                                    <input
                                        type="text"
                                        value={editForm.headline || ''}
                                        onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Location</label>
                                    <input
                                        type="text"
                                        value={editForm.location || ''}
                                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity mt-4 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}


            {/* Join Team Modal (Existing) */}
            {joinModal.isOpen && joinModal.project && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Join {joinModal.project.title}</h3>
                                <button
                                    type="button"
                                    onClick={() => setJoinModal({ isOpen: false, project: null })}
                                    className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Joined team:", joinModal.project.title);
                                setJoinModal({ isOpen: false, project: null });
                                alert(`Request sent to join ${joinModal.project.title}!`);
                            }}>
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Role</label>
                                    <input type="text" placeholder="e.g. Developer, Designer" className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm" autoFocus required />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Message</label>
                                    <textarea placeholder="Why you're a great fit..." rows={4} className="w-full px-3 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-sm resize-none" required></textarea>
                                </div>
                                <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity mt-2">
                                    Send Request
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

