import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    return (
        <button
            className={`btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
