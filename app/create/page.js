import Card from '@/components/ui/Card';
import MainLayout from '@/components/layout/MainLayout';
import { Rocket, Lightbulb, FileText, ArrowRight } from 'lucide-react';

export default function CreatePage() {
    const options = [
        {
            icon: <Rocket className="w-6 h-6 text-blue-500" />,
            title: 'Create Project',
            desc: 'Launch a new idea and build your team.',
            gradient: 'from-blue-500/20 to-blue-600/5',
            delay: '0s'
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
            title: 'Suggest Idea',
            desc: 'Share a concept for others to build.',
            gradient: 'from-pink-500/20 to-pink-600/5',
            delay: '0.1s'
        },
        {
            icon: <FileText className="w-6 h-6 text-green-500" />,
            title: 'Submit Resource',
            desc: 'Share tools, guides, or templates.',
            gradient: 'from-green-500/20 to-green-600/5',
            delay: '0.2s'
        },
    ];

    return (
        <MainLayout>
            <div className="max-w-lg mx-auto">
                <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4">
                    <h1 className="text-xl font-heading font-bold text-gradient">Create</h1>
                </header>

                <div className="px-4 py-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-heading font-bold mb-2">What will you build?</h2>
                        <p className="text-sm text-muted-foreground">Kickstart your journey with Prodizzy</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {options.map((opt, i) => (
                            <div
                                key={i}
                                className="animate-slide-up"
                                style={{ animationDelay: opt.delay }}
                            >
                                <Card className="group cursor-pointer relative overflow-hidden border-border/50 hover:border-primary/50 p-0">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${opt.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 flex items-center p-4">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            {opt.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-heading font-bold mb-1">{opt.title}</h3>
                                            <p className="text-xs text-muted-foreground">{opt.desc}</p>
                                        </div>
                                        <ArrowRight className="text-muted-foreground group-hover:text-primary w-5 h-5 transform group-hover:translate-x-1 transition-all duration-300" />
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
