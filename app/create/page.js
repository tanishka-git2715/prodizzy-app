import Card from '../../components/ui/Card';
import { Rocket, Lightbulb, FileText, Plus } from 'lucide-react';

export default function CreatePage() {
    const options = [
        { icon: <Rocket size={32} color="#4F7BFF" />, title: 'Create Project', desc: 'Launch a new idea and build your team.' },
        { icon: <Lightbulb size={32} color="#FF5BD5" />, title: 'Suggest Idea', desc: 'Share a concept for others to build.' },
        { icon: <FileText size={32} color="#4BE38A" />, title: 'Submit Resource', desc: 'Share tools, guides, or templates.' },
    ];

    return (
        <div className="container" style={{ paddingTop: 'var(--header-height)', paddingBottom: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '48px' }}>What do you want to build?</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                {options.map((opt, i) => (
                    <Card key={i} style={{ textAlign: 'center', padding: '40px 24px', cursor: 'pointer' }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            {opt.icon}
                        </div>
                        <h3 style={{ marginBottom: '12px' }}>{opt.title}</h3>
                        <p>{opt.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
