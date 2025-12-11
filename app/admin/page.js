"use client";
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Users, LayoutGrid, BarChart3, Search, Trash2, ExternalLink, ShieldAlert, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ users: 0, projects: 0 });
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [applications, setApplications] = useState([]);
    const [teamRequests, setTeamRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Stats
            const statsRes = await fetch('/api/admin/stats');
            const statsData = await statsRes.json();
            setStats(statsData);

            // Fetch Users
            const usersRes = await fetch('/api/admin/users');
            const usersData = await usersRes.json();
            setUsers(Array.isArray(usersData) ? usersData : []);

            // Fetch Projects
            const projectsRes = await fetch('/api/admin/projects');
            const projectsData = await projectsRes.json();
            setProjects(Array.isArray(projectsData) ? projectsData : []);

            // Fetch Applications (Pending Projects)
            const appsRes = await fetch('/api/admin/applications');
            const appsData = await appsRes.json();
            setApplications(Array.isArray(appsData) ? appsData : []);

            // Fetch Team Requests
            const teamRes = await fetch('/api/admin/team-requests');
            const teamData = await teamRes.json();
            setTeamRequests(Array.isArray(teamData) ? teamData : []);

        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApproveProject = async (projectId) => {
        if (!confirm("Approve this project?")) return;
        try {
            const { error } = await supabase
                .from('projects')
                .update({ status: 'approved' })
                .eq('id', projectId);

            if (error) throw error;

            // Refresh data
            fetchData();
            alert("Project Approved!");
        } catch (err) {
            console.error(err);
            alert("Failed to approve project");
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[50vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="p-6 max-w-7xl mx-auto pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage platform content and requests.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-destructive/20">
                            <ShieldAlert size={14} />
                            Admin Mode
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
                            <Users size={16} className="text-primary" />
                        </div>
                        <div className="text-2xl font-bold">{stats.users}</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Projects</h3>
                            <LayoutGrid size={16} className="text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold">{stats.projects}</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Pending Apps</h3>
                            <FileText size={16} className="text-orange-500" />
                        </div>
                        <div className="text-2xl font-bold">{applications.length}</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Team Requests</h3>
                            <Users size={16} className="text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold">{teamRequests.length}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border/50 mb-6 gap-6 overflow-x-auto">
                    {['overview', 'users', 'projects', 'applications', 'team_requests'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap capitalize ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {tab.replace('_', ' ')}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {activeTab === 'overview' && (
                        <div className="text-center py-20 bg-card border border-dashed border-border rounded-xl">
                            <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                                <BarChart3 className="text-muted-foreground" size={32} />
                            </div>
                            <h3 className="text-lg font-medium mb-1">System Overview</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                Check <strong>Applications</strong> to approve new projects or <strong>Team Requests</strong> to view applicants.
                            </p>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                                        <tr>
                                            <th className="px-4 py-3">User</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {users.map(user => (
                                            <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
                                                <td className="px-4 py-3 font-medium flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                                        {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : (user.full_name?.[0] || 'U')}
                                                    </div>
                                                    {user.full_name}
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">{user.email || 'N/A'}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                            <div className="p-4 text-sm text-muted-foreground border-b border-border bg-secondary/20">
                                This list shows ALL projects (Approved & Pending).
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                                        <tr>
                                            <th className="px-4 py-3">Project</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">Stage</th>
                                            <th className="px-4 py-3">Author</th>
                                            <th className="px-4 py-3">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {projects.map(project => (
                                            <tr key={project.id} className="hover:bg-secondary/20 transition-colors">
                                                <td className="px-4 py-3 font-medium">{project.title}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs border ${project.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                                        {project.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">{project.stage}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{project.author_name || 'Unknown'}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{new Date(project.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                            {applications.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">No pending applications.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                                            <tr>
                                                <th className="px-4 py-3">Project</th>
                                                <th className="px-4 py-3">Description</th>
                                                <th className="px-4 py-3">Submitted By</th>
                                                <th className="px-4 py-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {applications.map(app => (
                                                <tr key={app.id} className="hover:bg-secondary/20 transition-colors">
                                                    <td className="px-4 py-3 font-medium">
                                                        <div className="flex items-center gap-3">
                                                            {app.image_url && <img src={app.image_url} className="w-8 h-8 rounded bg-muted object-cover" />}
                                                            {app.title}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{app.description}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">{app.author_name}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => handleApproveProject(app.id)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ml-auto"
                                                        >
                                                            <CheckCircle size={14} /> Approve
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'team_requests' && (
                        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                            {teamRequests.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">No team requests found.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                                            <tr>
                                                <th className="px-4 py-3">Applicant</th>
                                                <th className="px-4 py-3">Role</th>
                                                <th className="px-4 py-3">Project</th>
                                                <th className="px-4 py-3">Message</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {teamRequests.map(req => (
                                                <tr key={req.id} className="hover:bg-secondary/20 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="font-medium">{req.applicant_name}</div>
                                                        <div className="text-xs text-muted-foreground">{req.applicant_email}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground">{req.role_applied}</td>
                                                    <td className="px-4 py-3 font-medium text-primary">{req.project_title}</td>
                                                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate" title={req.message}>
                                                        {req.message}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
