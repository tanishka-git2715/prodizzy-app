"use client";
import { useState } from 'react';
import Card from '../../components/ui/Card';
import { MapPin, Link as LinkIcon, Github, Twitter } from 'lucide-react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('user');

    return (
        <div className="container" style={{ paddingTop: 'var(--header-height)', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '800px', margin: '40px auto 0' }}>

                {/* Profile Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#2A303A', margin: '0 auto 24px', border: '4px solid var(--card-bg)' }}></div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Alex Builder</h1>
                    <p style={{ marginBottom: '16px' }}>Full Stack Developer & UI Designer</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> San Francisco</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><LinkIcon size={14} /> alex.dev</span>
                    </div>
                </div>

                {/* Toggle */}
                <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '4px', borderRadius: '12px', marginBottom: '32px' }}>
                    <button
                        onClick={() => setActiveTab('user')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '8px',
                            background: activeTab === 'user' ? 'var(--bg-dark)' : 'transparent',
                            color: activeTab === 'user' ? 'white' : 'var(--text-secondary)',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        User Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('project')}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '8px',
                            background: activeTab === 'project' ? 'var(--bg-dark)' : 'transparent',
                            color: activeTab === 'project' ? 'white' : 'var(--text-secondary)',
                            border: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Project Profile
                    </button>
                </div>

                {/* Content */}
                <div style={{ display: 'grid', gap: '24px' }}>
                    <Card>
                        <h3 style={{ marginBottom: '16px' }}>About</h3>
                        <p>Passionate about building tools that help other developers be more productive. Currently working on a new SaaS platform for project management.</p>
                    </Card>

                    <Card>
                        <h3 style={{ marginBottom: '16px' }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['React', 'Next.js', 'Node.js', 'UI Design', 'Product Management'].map(skill => (
                                <span key={skill} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '14px' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}
