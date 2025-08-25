import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AboutSection from "~/components/sections/AboutSection";
import ServicesSection from "~/components/sections/ServicesSection";
import ContactSection from "~/components/sections/ContactSection";
import FAQSection from "~/components/sections/FAQSection";
import Footer from "~/components/sections/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireLens AI" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  // No longer redirecting to auth here, just handle the view conditionally

  useEffect(() => {
    const loadResumes = async () => {
      if (!kv) return;
      
      setLoadingResumes(true);
      try {
        const resumes = (await kv.list('resume:*', true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
        ));
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error('Error loading resumes:', error);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, [kv]);

  // Scroll to section if hash is present in URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await auth.signIn();
      // The auth state will be updated by the store's signIn method
      loadResumes();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Using signIn with signUp: true will handle the signup flow
      await auth.signIn();
      // The auth state will be updated by the store's signIn method
      loadResumes();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await auth.signOut();
      // The auth state will be updated by the store's signOut method
      setResumes([]);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Load resumes when auth state changes or kv is available
  useEffect(() => {
    if (kv && auth.isAuthenticated) {
      loadResumes();
    }
  }, [kv, auth.isAuthenticated]);

  const loadResumes = async () => {
    if (!kv) return;
    
    setLoadingResumes(true);
    try {
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ));
      setResumes(parsedResumes || []);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoadingResumes(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
       {/* Premium Hero Section */}
<section id="home" className="relative min-h-screen bg-black overflow-hidden">
  {/* Animated Background Effects */}
  <div className="absolute inset-0">
    {/* Gradient Orbs */}
    <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
    
    {/* Floating Particles */}
    <div className="absolute inset-0 opacity-30">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 10)}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`
          }}
        ></div>
      ))}
    </div>
  </div>

  {/* Grid Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div 
      className="w-full h-full"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '30px 30px'
      }}
    ></div>
  </div>

  {/* Main Content */}
  <div className="relative z-10 pt-32 pb-20">
    <div className="main-section">
      <div className="page-heading py-16">
        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-purple-300 uppercase tracking-wider">
              AI-Powered • Real-time Analysis
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-8 leading-tight">
          <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {auth.isAuthenticated ? 'Track Your' : 'Get AI-Powered'}
          </span>
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-2">
            {auth.isAuthenticated ? 'Applications & Resume Ratings' : 'Resume Feedback'}
          </span>
        </h1>

        {/* Subtitle and CTAs */}
        <div className="flex flex-col items-center mt-8 space-y-8">
          {auth.isAuthenticated ? (
            <>
              {!loadingResumes && resumes?.length === 0 ? (
                <h2 className="text-xl md:text-2xl text-center text-gray-300 max-w-4xl leading-relaxed">
                  No resumes found. 
                  <span className="text-purple-400"> Upload your first resume</span> to get instant AI-powered feedback and insights.
                </h2>
              ) : (
                <h2 className="text-xl md:text-2xl text-center text-gray-300 max-w-4xl leading-relaxed">
                  Review your submissions and 
                  <span className="text-blue-400"> check AI-powered feedback</span> to optimize your career journey.
                </h2>
              )}
              <Link 
                to={auth.isAuthenticated ? "/upload" : "#"}
                onClick={auth.isAuthenticated ? undefined : handleSignUp}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25"
              >
                <span className="relative z-10">
                  {auth.isAuthenticated ? 'Go to Upload' : "Get Started - It's Free"}
                </span>
                <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl text-center text-gray-300 max-w-4xl leading-relaxed">
                Get instant feedback on your resume and 
                <span className="text-purple-400"> improve your chances</span> of landing interviews with our advanced AI analysis.
              </h2>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={handleSignUp} 
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25"
                >
                  <span className="relative z-10">Get Started - It's Free</span>
                  <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </button>
                <button 
                  onClick={handleLogin}
                  className="group inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  <span>Sign In</span>
                  <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Loading State */}
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500"></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent rounded-full animate-pulse border-t-pink-500"></div>
          </div>
          <p className="text-xl text-gray-300">Analyzing your resumes...</p>
          <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
        </div>
      )}

      {/* Empty State for Non-authenticated Users */}
      {!auth.isAuthenticated && !loadingResumes && (
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🚀", title: "Instant Analysis", desc: "Get feedback in seconds" },
              { icon: "🎯", title: "ATS Optimized", desc: "Beat applicant tracking systems" },
              { icon: "📊", title: "Detailed Insights", desc: "Comprehensive improvement tips" }
            ].map((feature, index) => (
              <div key={index} className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Authenticated Users */}
      {!loadingResumes && resumes?.length === 0 && auth.isAuthenticated && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
              <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          <div className="text-center max-w-lg">
            <p className="text-xl text-gray-300 mb-6">
              Ready to optimize your resume? Upload your first document and discover how AI can enhance your job applications.
            </p>
            <button 
              onClick={handleSignUp}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Your First Resume
              <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Bottom Gradient Fade */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
</section>




        {/* Resumes Section - Only show when authenticated */}
        {auth.isAuthenticated && (
          <section id="resumes" className="py-16 bg-white dark:bg-gray-900">
            <div className="main-section">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Resumes</h2>
              </div>
              {loadingResumes ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="resumes-section">
                  {resumes?.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                  ))}
                  {resumes?.length === 0 && (
                    <div className="text-center w-full py-12">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't uploaded any resumes yet.</p>
                      <Link 
                        to="/upload" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Upload Your First Resume
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* About Section */}
        <div className="bg-white dark:bg-gray-900">
          <AboutSection />
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 dark:bg-gray-800">
          <ServicesSection />
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900">
          <FAQSection />
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
