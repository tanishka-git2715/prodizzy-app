import Card from '../../components/ui/Card';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

export default function SearchPage() {
    return (
        <div className="container" style={{ paddingTop: 'var(--header-height)', paddingBottom: '100px' }}>
            <div style={{ padding: '40px 0 24px' }}>
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                    <SearchIcon style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search projects, people, or resources..."
                        style={{
                            width: '100%',
                            height: '56px',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--stroke)',
                            borderRadius: '16px',
                            padding: '0 48px',
                            color: 'white',
                            fontSize: '16px',
                            outline: 'none'
                        }}
                    />
                    <button style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                        <SlidersHorizontal size={20} />
                    </button>
                </div>

                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Recommended for you</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {[1, 2, 3, 4].map((item) => (
                        <Card key={item}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2A303A' }}></div>
                                <div>
                                    <h4 style={{ fontSize: '16px' }}>Creator Name</h4>
                                    <p style={{ fontSize: '12px' }}>Product Designer</p>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Design System Kit</h3>
                            <p style={{ fontSize: '14px', marginBottom: '16px' }}>A comprehensive UI kit for modern SaaS applications.</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ fontSize: '12px', background: '#2A303A', padding: '4px 8px', borderRadius: '4px' }}>Figma</span>
                                <span style={{ fontSize: '12px', background: '#2A303A', padding: '4px 8px', borderRadius: '4px' }}>UI/UX</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
