"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import ProjectCard from '@/components/projects/ProjectCard';
import MainLayout from '@/components/layout/MainLayout';
import { Search as SearchIcon, SlidersHorizontal, Bot, CreditCard, BookOpen, Heart, Users, Wrench, ShoppingCart, Gamepad } from 'lucide-react';
import { mockProjects } from '@/data/mockData';

const categories = [
    { icon: Bot, name: 'AI & ML', count: 1 },
    { icon: Users, name: 'Social', count: 2 },
];

export default function SearchPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = mockProjects.filter((project) => {
        const matchesCategory = selectedCategory ? project.category === selectedCategory : true;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCategoryClick = (categoryName) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(null); // Deselect
        } else {
            setSelectedCategory(categoryName);
        }
    };

    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                {/* Header */}
                {/* Desktop Header - Restored */}
                <div className="hidden lg:block">
                    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 mb-2">
                        <h1 className="text-xl font-heading font-bold text-gradient mb-4">Search</h1>
                        <div className="relative w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <SearchIcon size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-11 bg-secondary/50 border border-transparent rounded-xl pl-11 pr-11 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1">
                                <SlidersHorizontal size={18} />
                            </button>
                        </div>
                    </header>
                </div>

                {/* Mobile Page Title */}
                <div className="lg:hidden px-4 pt-4">
                    <h1 className="text-2xl font-bold font-heading mb-1">Search</h1>
                </div>

                {/* Search Input - Moved below header (Mobile Only) */}
                <div className="lg:hidden sticky top-[60px] z-30 bg-background/95 backdrop-blur-xl border-b border-border px-4 py-2">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <SearchIcon size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 bg-secondary/50 border border-transparent rounded-xl pl-11 pr-11 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1">
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>

                <div className="px-4 py-4">
                    <h2 className="text-lg font-heading font-bold mb-4 px-1">Discover Categories</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                onClick={() => handleCategoryClick(category.name)}
                                className={`items-center border rounded-2xl p-4 transition-all cursor-pointer group ${selectedCategory === category.name
                                    ? 'bg-primary/5 border-primary shadow-sm'
                                    : 'bg-card border-border hover:border-primary/50'
                                    }`}
                            >
                                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                                <p className="text-xs text-muted-foreground font-medium">{category.count} projects</p>
                            </div>
                        ))}
                    </div>

                    {/* Results Grid - Re-adding this to show filtered results */}
                    <div className="grid grid-cols-1 gap-4">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <ProjectCard {...project} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>No projects found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
