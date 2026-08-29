export default function Button({children, onClick, className}: {children: React.ReactNode, onClick?: () => void, className?: string}) {
    return(
        <button 
        onClick={onClick} 
        className={`flex justify-center items-center font-semibold text-sm rounded-lg px-4 py-2 transition-all duration-150 ${className}`}>
            {children}
        </button>
    );
}