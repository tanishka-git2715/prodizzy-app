"use client";
import MainLayout from '@/components/layout/MainLayout';
import ProjectCard from '@/components/projects/ProjectCard';
import { mockProjects } from '@/data/mockData';

export default function ProjectsPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-heading font-bold mb-2">Projects</h1>
                    <p className="text-muted-foreground">Discover innovative projects and join their teams.</p>
                </header>

                <div className="flex flex-col gap-6">
                    {mockProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            {...project}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
