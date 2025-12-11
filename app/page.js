import { Zap } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { mockProjects } from "@/data/mockData";

const Index = () => {
    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 lg:hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shadow-glow-sm">
                            <img src="/logo.jpg" alt="Prodizzy Logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-xl font-heading font-bold text-gradient">Prodizzy</h1>
                    </div>
                </header>

                {/* Desktop Header */}
                <header className="hidden lg:block py-6 border-b border-border mb-6">
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
