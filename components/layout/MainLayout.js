const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background lg:pl-64">
            <div className="pb-20 lg:pb-0 pt-[60px] lg:pt-0">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
