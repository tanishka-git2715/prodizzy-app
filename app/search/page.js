import Card from '@/components/ui/Card';
import MainLayout from '@/components/layout/MainLayout';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { mockProjects } from '@/data/mockData';

export default function SearchPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4">
                    <h1 className="text-xl font-heading font-bold text-gradient mb-4">Search</h1>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <SearchIcon size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full h-11 bg-secondary/50 border border-transparent rounded-xl pl-11 pr-11 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1">
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </header>

                <div className="px-4 py-6">
                    <h2 className="text-lg font-heading font-bold mb-4 px-1">Recommended for you</h2>

                    <div className="grid grid-cols-1 gap-4">
                        {mockProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Card className="hover:border-primary/50 cursor-pointer p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border border-border">
                                            <img src={project.author.avatar} alt={project.author.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground text-sm">{project.author.name}</h4>
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Product Designer</p>
                                        </div>
                                    </div>
                                    <h3 className="text-base font-semibold mb-1.5">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
