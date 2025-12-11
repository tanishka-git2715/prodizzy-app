import Card from '@/components/ui/Card';
import MainLayout from '@/components/layout/MainLayout';
import { Download, FileText } from 'lucide-react';

export default function ResourcesPage() {
    return (
        <MainLayout>
            <div className="w-full max-w-lg lg:max-w-full lg:px-8 mx-auto">
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4">
                    <h1 className="text-xl font-heading font-bold text-gradient">Resources</h1>
                </header>

                <div className="px-4 py-6">
                    <div className="mb-6">
                        <p className="text-sm text-muted-foreground">Curated tools for builders.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            { title: 'MVP Canvas', description: 'Essential template for defining your MVP', url: '/resources/mvp_canvas.pdf' },
                            { title: 'Sample PRD Document', description: 'Sample Product Requirements Document of Zomato', url: '/resources/prd_document.pdf' },
                            { title: 'Brand Guidelines', description: 'Visual identity and design standards', url: '/resources/brand_guidelines.pdf' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="animate-slide-up"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <Card className="flex items-center p-4 hover:border-primary/50">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-background border border-border flex items-center justify-center mr-4">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0 mr-4">
                                        <h3 className="text-base font-bold mb-0.5 truncate">{item.title}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                                    </div>
                                    {item.url !== '#' ? (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...(item.url.endsWith('.pdf') ? { download: true } : {})}
                                            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-secondary-foreground transition-colors flex-shrink-0"
                                        >
                                            <Download size={18} />
                                        </a>
                                    ) : (
                                        <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-secondary-foreground transition-colors flex-shrink-0">
                                            <Download size={18} />
                                        </button>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
