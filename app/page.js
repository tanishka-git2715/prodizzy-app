import Card from '../components/ui/Card';
import { ArrowRight, Heart, MessageSquare, Bookmark } from 'lucide-react';

export default function Home() {
    return (
        <div className="container" style={{ paddingTop: 'var(--header-height)', paddingBottom: '100px' }}>

            {/* Hero Section - Desktop Only */}
            <section className="hero" style={{ padding: '80px 0', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '24px' }}>
                    Build meaningful projects <br />
                    <span style={{ color: '#9AA4B5' }}>with confidence.</span>
                </h1>
                <p style={{ fontSize: '20px', maxWidth: '600px', margin: '0 auto 40px' }}>
                    The all-in-one platform for builders, creators, and innovators to launch their next big idea.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="btn btn-primary">Get Started <ArrowRight size={18} style={{ marginLeft: '8px' }} /></button>
                    <button className="btn btn-secondary">Explore Projects</button>
                </div>
            </section>

            {/* Feed Section */}
            <section>
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '24px', marginBottom: '24px' }}>
                    {['Featured', 'Top Picks', 'Trending', 'Newest', 'Launched'].map(tag => (
                        <span key={tag} style={{
                            padding: '8px 16px',
                            background: 'var(--card-bg)',
                            borderRadius: '20px',
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                            border: '1px solid var(--stroke)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Card key={item}>
                            <div style={{ height: '180px', background: '#2A303A', borderRadius: '8px', marginBottom: '16px' }}></div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '12px', color: '#4F7BFF', background: 'rgba(79, 123, 255, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>SaaS</span>
                                <span style={{ fontSize: '12px', color: '#4BE38A', background: 'rgba(75, 227, 138, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>Building</span>
                            </div>
                            <h3 style={{ marginBottom: '8px' }}>Project Name {item}</h3>
                            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                                A short description of the project goes here. It solves a problem for a specific user group.
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={16} /> 24</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={16} /> 8</span>
                                </div>
                                <Bookmark size={16} />
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
