"use client";
import { useState, useEffect } from 'react';
import { Zap } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { supabase } from "@/utils/supabase/client";
import { mockProjects } from "@/data/mockData";

const Index = () => {
    // Optimistic Init: Start with mock data so page is never empty
    const [projects, setProjects] = useState([...mockProjects]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            let dbProjects = [];

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('status', 'approved') // Only show approved
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching projects:', error);
                } else if (data) {
                    dbProjects = data.map(p => ({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        image: p.image_url,
                        websiteUrl: p.website_url,
                        stage: p.stage,
                        category: p.category,
                        joinTeam: p.join_team,
                        author: {
                            id: p.author_id,
                            name: p.author_name || 'Unknown',
                            avatar: `https://ui-avatars.com/api/?name=${p.author_name || 'User'}`,
                            profileUrl: `/profile/${p.author_id}`
                        },
                        likes: 0,
                        timeAgo: new Date(p.created_at).toLocaleDateString()
                    }));
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            }

            // Merge mock projects with DB projects
            const combined = [...dbProjects, ...mockProjects];

            // Deduplicate by ID
            const uniqueProjects = Array.from(new Map(combined.map(item => [item.id, item])).values());

            setProjects(uniqueProjects);
            setLoading(false);
        };
        fetchProjects();
    }, []);
    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                {/* Header */}
                {/* Header removed for global mobile header */}
                {/* Mobile Page Title */}
                <div className="lg:hidden px-4 pt-4">
                    <h1 className="text-2xl font-bold font-heading mb-1">Home</h1>
                    <p className="text-sm text-[#888888] mb-4">Discover what builders are creating.</p>
                    <div className="h-px bg-white/10 mb-6 w-full" />
                </div>

                {/* Desktop Header */}
                <header className="hidden lg:block py-6 border-b border-border mb-6">
                    <h1 className="text-2xl font-heading font-bold">Home</h1>
                    <p className="text-muted-foreground mt-1">Discover what builders are creating</p>
                </header>

                {/* Feed */}
                <div className="flex flex-col gap-3 px-4 sm:gap-6 sm:px-0">
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground animate-pulse">Loading projects...</div>
                    ) : (
                        projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProjectCard {...project} />
                            </div>
                        ))
                    )}
                </div>

                {/* Load more indicator */}
                <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground animate-pulse-soft">
                        Loading more projects...
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
