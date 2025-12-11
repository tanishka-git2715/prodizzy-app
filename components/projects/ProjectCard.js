"use client";

import { ArrowBigUp, Bookmark, ExternalLink, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProjectCard = ({ title, description, tags, likes, comments, author, image, timeAgo, websiteUrl, detailsUrl, joinTeam, stage }) => {
    const router = useRouter();

    const handleCardClick = () => {
        if (detailsUrl) {
            router.push(detailsUrl);
        }
    };

    const handleAction = (e, action) => {
        e.preventDefault();
        e.stopPropagation();

        if (action === 'Join Team') {
            if (detailsUrl) router.push(detailsUrl);
            return;
        }

        console.log(`${action} clicked`);
        // Add actual logic here later
    };

    return (
        <div
            onClick={handleCardClick}
            className="group block p-2.5 sm:p-5 rounded-xl border border-white/40 sm:border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
            <div className="flex gap-2.5 sm:gap-4 mb-2 sm:mb-0">
                {/* Project Image */}
                <div className="relative w-12 h-12 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                                <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                                    {title}
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mb-0.5">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            {stage && (
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${stage === 'Live' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                                    stage === 'Building' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                                        'bg-secondary text-secondary-foreground border-transparent'
                                    }`}>
                                    {stage}
                                </span>
                            )}
                            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap hidden sm:block">{timeAgo}</span>
                        </div>
                    </div>

                    {/* Desktop Footer Actions (Hidden on Mobile) */}
                    <div className="hidden sm:flex flex-wrap items-center justify-between gap-y-3 mt-1">
                        {/* Author & Follow */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (author.profileUrl) router.push(author.profileUrl);
                                }}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group/author text-left"
                            >
                                <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full ring-1 ring-border group-hover/author:ring-primary/50" />
                                <span className="text-xs font-medium">{author.name}</span>
                            </button>
                            <button
                                onClick={(e) => handleAction(e, 'Follow')}
                                className="text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded-full transition-colors"
                            >
                                Follow
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Upvotes */}
                            <button
                                onClick={(e) => handleAction(e, 'Upvote')}
                                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group/vote"
                            >
                                <div className="p-1 rounded-md group-hover/vote:bg-primary/10 transition-colors">
                                    <ArrowBigUp className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-medium">{likes || 0}</span>
                            </button>

                            {/* Save */}
                            <button
                                onClick={(e) => handleAction(e, 'Save')}
                                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group/save"
                                title="Save Project"
                            >
                                <div className="p-1 rounded-md group-hover/save:bg-primary/10 transition-colors">
                                    <Bookmark className="w-4 h-4" />
                                </div>
                            </button>

                            {/* Links */}
                            <div className="h-4 w-px bg-border mx-1" />

                            <a
                                href={websiteUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                                Visit
                                <ExternalLink className="w-3 h-3" />
                            </a>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(detailsUrl);
                                }}
                                className="text-xs font-medium text-primary hover:text-primary/80"
                            >
                                Details
                            </button>

                            {joinTeam && (
                                <button
                                    onClick={(e) => handleAction(e, 'Join Team')}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm ml-1"
                                >
                                    <Users className="w-3 h-3" />
                                    Join Team
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Footer Actions (Visible only on Mobile) - Compact & Below Logo */}
            <div className="flex flex-col sm:hidden gap-2 pt-2 border-t border-white/10 mt-2">
                {/* Row 1: Author & Follow */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (author.profileUrl) router.push(author.profileUrl);
                        }}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group/author text-left"
                    >
                        <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full ring-1 ring-border group-hover/author:ring-primary/50" />
                        <span className="text-xs font-medium text-gray-300">{author.name}</span>
                    </button>
                    <button
                        onClick={(e) => handleAction(e, 'Follow')}
                        className="text-[10px] font-medium text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full transition-colors"
                    >
                        Follow
                    </button>
                </div>

                {/* Row 2: Actions */}
                <div className="flex items-center gap-3">
                    {/* Upvotes */}
                    <button
                        onClick={(e) => handleAction(e, 'Upvote')}
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group/vote"
                    >
                        <ArrowBigUp className="w-4 h-4" />
                        <span className="text-xs font-medium">{likes || 0}</span>
                    </button>

                    {/* Bookmark */}
                    <button
                        onClick={(e) => handleAction(e, 'Save')}
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group/save"
                    >
                        <Bookmark className="w-4 h-4" />
                    </button>

                    <div className="h-3 w-px bg-white/20 mx-0.5" />

                    {/* Visit */}
                    <a
                        href={websiteUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                        Visit
                        <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* Details */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(detailsUrl);
                        }}
                        className="text-xs font-bold text-white hover:text-primary/80"
                    >
                        Details
                    </button>

                    {/* Join Team - White Pill */}
                    {joinTeam && (
                        <button
                            onClick={(e) => handleAction(e, 'Join Team')}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors shadow-sm ml-auto"
                        >
                            <Users className="w-3 h-3" />
                            Join Team
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
