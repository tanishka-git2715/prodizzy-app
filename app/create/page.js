"use client";
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Rocket, Lightbulb, Wrench, Beaker, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // 1. Check Auth
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("Please login to submit a project.");
                router.push('/login');
                return;
            }

            const formData = new FormData(e.target);
            const rawData = Object.fromEntries(formData.entries());
            const file = formData.get('logo');

            let publicUrl = "https://placehold.co/400x400/png?text=No+Logo"; // Default Logo

            // 2. Upload Image (Optional)
            if (file && file.size > 0) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${user.id}-${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('project-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('project-images')
                    .getPublicUrl(filePath);

                publicUrl = data.publicUrl;
            }

            // 3. Insert Project
            const { error: insertError } = await supabase
                .from('projects')
                .insert({
                    title: rawData.title,
                    description: rawData.description,
                    website_url: rawData.websiteUrl || '', // Optional
                    status: 'pending',
                    stage: rawData.stage,
                    join_team: rawData.joinTeam === 'on',
                    image_url: publicUrl,
                    author_id: user.id,
                    author_name: user.user_metadata?.full_name || 'Anonymous'
                });

            if (insertError) throw insertError;

            alert('Project submitted! It will appear after admin approval.');
            router.push('/');

        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error creating project. Check console.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4">
                    <h1 className="text-xl font-heading font-bold text-gradient">Launch Project</h1>
                </header>

                <form onSubmit={handleSubmit} className="px-4 py-6 flex flex-col gap-6 animate-slide-up">
                    {/* Logo Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer bg-secondary/20">
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-muted-foreground group-hover:text-primary transition-colors">
                                    <span className="text-xs font-medium">Upload</span>
                                    <span className="text-[10px]">Logo</span>
                                    <span className="text-[9px] opacity-70">(Optional)</span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended: Square JPG/PNG</p>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project Name</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Chordy"
                                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">One-line Description</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="e.g. AI super-connector for..."
                                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Website URL <span className="text-muted-foreground font-normal ml-1">(Optional)</span></label>
                            <input
                                type="url"
                                name="websiteUrl"
                                placeholder="https://"
                                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Project Stage</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { id: 'Ideation', label: 'Ideation', icon: Lightbulb, color: 'text-yellow-500', border: 'peer-checked:border-yellow-500', bg: 'peer-checked:bg-yellow-500/10' },
                                    { id: 'Building', label: 'Building', icon: Wrench, color: 'text-blue-500', border: 'peer-checked:border-blue-500', bg: 'peer-checked:bg-blue-500/10' },
                                    { id: 'Testing', label: 'Testing', icon: Beaker, color: 'text-purple-500', border: 'peer-checked:border-purple-500', bg: 'peer-checked:bg-purple-500/10' },
                                    { id: 'Live', label: 'Live', icon: Rocket, color: 'text-green-500', border: 'peer-checked:border-green-500', bg: 'peer-checked:bg-green-500/10' }
                                ].map((s) => (
                                    <label key={s.id} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="stage"
                                            value={s.id}
                                            className="peer sr-only"
                                            defaultChecked={s.id === 'Ideation'}
                                        />
                                        <div className={`h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all ${s.border} ${s.bg}`}>
                                            <s.icon className={`w-6 h-6 ${s.color}`} />
                                            <span className="text-xs font-medium text-center">{s.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="mt-2 w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Submitting Project...
                            </>
                        ) : (
                            "Submit Project"
                        )}
                    </button>
                </form>
            </div >
        </MainLayout >
    );
}
