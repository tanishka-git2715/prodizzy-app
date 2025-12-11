"use client";
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { mockProjects } from '@/data/mockData';
import { Globe, Instagram, Linkedin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectPage() {
    const params = useParams();
    const { id } = params;
    const project = mockProjects.find((p) => p.id === id);

    if (!project) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">Go Home</Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft size={18} />
                    <span>Back</span>
                </Link>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-border shadow-sm">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-4xl font-heading font-bold mb-6">{project.title}</h1>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {project.socials.website ? (
                            <a href={project.socials.website} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-foreground">
                                <Globe size={20} />
                            </a>
                        ) : (
                            <button disabled className="p-3 rounded-full bg-secondary/50 text-muted-foreground cursor-not-allowed">
                                <Globe size={20} />
                            </button>
                        )}

                        {project.socials.instagram ? (
                            <a href={project.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-foreground">
                                <Instagram size={20} />
                            </a>
                        ) : (
                            <button disabled className="p-3 rounded-full bg-secondary/50 text-muted-foreground cursor-not-allowed">
                                <Instagram size={20} />
                            </button>
                        )}

                        {project.socials.linkedin ? (
                            <a href={project.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-foreground">
                                <Linkedin size={20} />
                            </a>
                        ) : (
                            <button disabled className="p-3 rounded-full bg-secondary/50 text-muted-foreground cursor-not-allowed">
                                <Linkedin size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* About Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                        {project.about}
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-border mb-12" />

                {/* Join Team Form */}
                <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold mb-6">Join Team</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Name</label>
                            <input
                                type="text"
                                className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Email</label>
                            <input
                                type="email"
                                className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Skills / Role You're Applying For</label>
                            <input
                                type="text"
                                className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="e.g. Frontend Developer, Marketing..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Why Do You Want to Join {project.title}?</label>
                            <textarea
                                className="w-full h-24 px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                placeholder="Tell us about your motivation..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Portfolio / LinkedIn / Github</label>
                            <input
                                type="text"
                                className="w-full h-10 px-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        <button className="w-full py-3 mt-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
                            Join {project.title} Team
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
