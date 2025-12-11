import { Heart, MessageSquare, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const ProjectCard = ({ title, description, tags, likes, comments, author, image, timeAgo }) => {
    return (
        <div className="group block p-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex gap-4">
                {/* Project Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-heading font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                                {title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {description}
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full" />
                            <span className="text-xs">{author.name}</span>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors group/like">
                                <Heart className="w-4 h-4 group-hover/like:fill-current" />
                                <span className="text-xs font-medium">{likes}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-blue-500 transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-xs font-medium">{comments}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
