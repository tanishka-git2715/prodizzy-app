import { Zap } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { mockProjects } from "@/data/mockData";

const Index = () => {
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
