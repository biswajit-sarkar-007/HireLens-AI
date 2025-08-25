import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { auth, isLoading } = usePuterStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        }
    }, []);
    
    const handleLogin = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await window.puter.auth.signIn();
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleSignUp = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await window.puter.auth.signIn();
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await window.puter.auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'About Us', id: 'about' },
        { name: 'Services', id: 'services' },
        { name: 'Contact Us', id: 'contact' },
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800/50 transition-all duration-300">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 group">
                            <div className="relative">
                                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-300">
                                    HireLens AI
                                </p>
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                            </div>
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden lg:block ml-16">
                            <div className="flex space-x-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.id);
                                            window.history.pushState({}, '', `#${item.id}`);
                                        }}
                                        className={`relative group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                            activeSection === item.id 
                                                ? 'text-white bg-white/10' 
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {activeSection === item.id && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-sm"></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth.isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-lg">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm font-medium">Online</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="group relative px-6 py-2.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-lg text-sm font-medium transition-all duration-300"
                                >
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                                        </svg>
                                        Logout
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className="group px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                                >
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Login
                                    </span>
                                </button>
                                <button
                                    onClick={handleSignUp}
                                    className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                        Get Started
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative p-2 text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
                        >
                            <div className="w-6 h-6 relative">
                                <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'}`}></span>
                                <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-2.5'}`}></span>
                                <span className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-4 pt-2 pb-4 space-y-2 bg-black/95 backdrop-blur-xl border-t border-gray-800/50">
                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                                activeSection === item.id
                                    ? 'text-white bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {item.name}
                        </button>
                    ))}
                    
                    {/* Mobile Auth Buttons */}
                    <div className="pt-4 border-t border-gray-800/50 space-y-3">
                        {auth.isAuthenticated ? (
                            <>
                                <div className="flex items-center justify-center space-x-3 px-4 py-3 bg-green-600/10 border border-green-500/20 rounded-lg">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm font-medium">Authenticated</span>
                                </div>
                                <button
                                    className="w-full px-4 py-3 rounded-lg text-base font-medium text-red-400 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 transition-colors duration-300"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout(e);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <span className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                                        </svg>
                                        Logout
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={(e) => {
                                        setIsMenuOpen(false);
                                        handleLogin(e);
                                    }}
                                    className="w-full px-4 py-3 rounded-lg text-base font-medium text-gray-300 bg-white/5 border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
                                >
                                    <span className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Login
                                    </span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        setIsMenuOpen(false);
                                        handleSignUp(e);
                                    }}
                                    className="w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
                                >
                                    <span className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                        Get Started
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;