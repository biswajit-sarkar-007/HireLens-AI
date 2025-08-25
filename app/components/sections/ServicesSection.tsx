import React, { useState } from 'react';

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: 'AI-Powered Resume Review',
      description: 'Transform your resume with cutting-edge AI analysis that identifies improvement opportunities and optimizes for maximum impact.',
      features: [
        'Advanced ATS compatibility scanning',
        'Industry-specific keyword optimization',
        'Professional formatting analysis',
        'Content structure evaluation',
        'Skills gap identification'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      borderGradient: 'from-blue-500/30 to-cyan-500/30',
      price: 'its free to use',
      popular: true
    },
    {
      title: 'Smart Cover Letter Generator',
      description: 'Generate compelling, personalized cover letters that capture attention and demonstrate your perfect fit for each role.',
      features: [
        'AI-driven content personalization',
        'Company research integration',
        'Tone and style customization',
        'Multiple template options',
        'Real-time optimization suggestions'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      borderGradient: 'from-purple-500/30 to-pink-500/30',
      price: 'Starting at $19'
    },
    {
      title: 'Advanced Interview Preparation',
      description: 'Master your interviews with comprehensive preparation tools, practice sessions, and expert-curated question banks.',
      features: [
        'Role-specific question databases',
        'Technical skill assessments',
        'Behavioral interview coaching',
        'Mock interview simulations',
        'Performance analytics and feedback'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      borderGradient: 'from-green-500/30 to-emerald-500/30',
      price: 'Starting at $39'
    },
    {
      title: 'Executive Career Coaching',
      description: 'Accelerate your career growth with personalized coaching, strategic planning, and industry insights from seasoned professionals.',
      features: [
        'Personalized career roadmapping',
        '1-on-1 expert consultations',
        'Industry trend analysis',
        'Professional networking strategies',
        'Leadership development guidance'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      borderGradient: 'from-orange-500/30 to-red-500/30',
      price: 'Starting at $99',
      premium: true
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-sm font-medium rounded-full mb-6 border border-blue-500/20">
            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-blue-400">Premium Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Career Journey</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Comprehensive suite of AI-powered tools and expert services designed to accelerate your professional growth 
            and help you land your dream job faster than ever before.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-gray-800/40 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                service.popular ? 'border-blue-500/30 hover:border-blue-400/50' :
                service.premium ? 'border-orange-500/30 hover:border-orange-400/50' :
                `border-gray-700/50 hover:border-${service.gradient.split('-')[1]}-400/50`
              } ${hoveredIndex === index ? `bg-gradient-to-br ${service.bgGradient}` : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Popular/Premium Badge */}
              {(service.popular || service.premium) && (
                <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  service.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                  'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                } shadow-lg`}>
                  {service.popular ? 'Most Popular' : 'Premium'}
                </div>
              )}

              {/* Service Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>

              {/* Service Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {service.title}
                  </h3>
                  <span className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                    {service.price}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mt-0.5`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/20`}>
                <span className="flex items-center justify-center">
                  Get Started
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats/Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
            <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-sm text-gray-400">Resumes Optimized</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
            <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
            <div className="text-3xl font-bold text-purple-400 mb-2">24hrs</div>
            <div className="text-sm text-gray-400">Average Delivery</div>
          </div>
          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
            <div className="text-3xl font-bold text-orange-400 mb-2">4.9★</div>
            <div className="text-sm text-gray-400">Customer Rating</div>
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default ServicesSection;