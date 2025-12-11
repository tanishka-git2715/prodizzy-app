import { Zap } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { mockProjects } from "@/data/mockData";

const Index = () => {
    return (
        <MainLayout>
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 lg:hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                            <Zap className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl font-heading font-bold text-gradient">Prodizzy</h1>
                    </div>
                </header>

                {/* Desktop Header */}
                <header className="hidden lg:block px-6 py-6 border-b border-border">
                    <h1 className="text-2xl font-heading font-bold">Your Feed</h1>
                    <p className="text-muted-foreground mt-1">Discover what builders are creating</p>
                </header>

                {/* Feed */}
                <div className="divide-y divide-border">
                    {mockProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ProjectCard {...project} />
                        </div>
                    ))}
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
