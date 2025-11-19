import Card from '../../components/ui/Card';
import { Download, ExternalLink } from 'lucide-react';

export default function ResourcesPage() {
    return (
        <div className="container" style={{ paddingTop: 'var(--header-height)', paddingBottom: '100px' }}>
            <div style={{ padding: '40px 0' }}>
                <h1 style={{ marginBottom: '16px' }}>Resources</h1>
                <p style={{ marginBottom: '40px', maxWidth: '600px' }}>Curated tools, templates, and guides to help you build better products faster.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {['PRD Template', 'MVP Canvas', 'Launch Checklist', 'User Persona Kit'].map((item, i) => (
                        <Card key={i}>
                            <div style={{ height: '140px', background: 'linear-gradient(135deg, #1A1F27 0%, #2A303A 100%)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FileText size={40} color="#4F7BFF" />
                            </div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{item}</h3>
                            <p style={{ fontSize: '14px', marginBottom: '16px' }}>Essential documentation template for product managers and founders.</p>
                            <button className="btn btn-secondary" style={{ width: '100%', height: '40px', fontSize: '14px' }}>
                                <Download size={16} style={{ marginRight: '8px' }} /> Download
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { FileText } from 'lucide-react';
