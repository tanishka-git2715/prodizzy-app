"use client";
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Rocket, Lightbulb, Wrench, Beaker, ArrowRight } from 'lucide-react';

export default function CreatePage() {
    const [imagePreview, setImagePreview] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Project Data:', data);
        alert('Project Created! (Check console for data)');
        // Redirect or reset form here
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
                                required
                            />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-muted-foreground group-hover:text-primary transition-colors">
                                    <span className="text-xs font-medium">Upload</span>
                                    <span className="text-[10px]">Logo</span>
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
                            <label className="text-sm font-medium">Website URL</label>
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

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                name="joinTeam"
                                id="joinTeam"
                                className="w-5 h-5 rounded border-border bg-secondary/30 text-primary focus:ring-primary/20"
                            />
                            <label htmlFor="joinTeam" className="text-sm font-medium cursor-pointer">
                                Allow others to join team
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                        Submit Project
                    </button>
                </form>
            </div >
        </MainLayout >
    );
}
