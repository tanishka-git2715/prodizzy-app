export default function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`bg-card text-card-foreground p-6 rounded-lg border border-transparent hover:border-border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
