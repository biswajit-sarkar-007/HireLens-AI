import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does the resume analysis work?',
      answer: 'Our advanced AI system leverages machine learning algorithms trained on thousands of successful resumes and industry standards. It analyzes your resume against specific job descriptions, checks for ATS compatibility, evaluates keyword density, assesses formatting consistency, and provides actionable insights to improve your chances of landing interviews.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We implement enterprise-grade security measures including end-to-end encryption, secure data storage with AWS infrastructure, regular security audits, and GDPR compliance. Your resume and personal information are never shared with third parties, and you maintain full control over your data with the ability to delete it at any time.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      question: 'How accurate and reliable is the AI feedback?',
      answer: 'Our AI model has been trained on over 50,000 successful resumes across various industries and has a 94% accuracy rate in identifying improvement areas. While highly reliable, we recommend combining our AI insights with human expertise. Our feedback is continuously updated based on the latest hiring trends and recruiter preferences.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: 'Can I update and re-analyze my resume?',
      answer: 'Yes! You can upload new versions of your resume unlimited times during your subscription period. Each upload triggers a fresh analysis with updated feedback. Our system tracks your improvements over time and provides progress insights to help you see how your resume evolves.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      question: 'What is your refund and satisfaction policy?',
      answer: 'We stand behind our service with a comprehensive 30-day money-back guarantee. If you\'re not completely satisfied with the insights and improvements our platform provides, contact our support team for a full refund. We also offer personalized support to ensure you get maximum value from our service.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      question: 'Do you support different resume formats and industries?',
      answer: 'Our platform supports all major resume formats including chronological, functional, and hybrid layouts. We provide industry-specific analysis for tech, healthcare, finance, marketing, education, and 15+ other sectors. Our AI understands industry-specific keywords, trends, and requirements to provide tailored recommendations.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-6 border border-blue-500/20">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Find comprehensive answers to common questions about our resume analysis platform, 
            security measures, and how we help accelerate your career growth.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <button
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-inset"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-700/70 group-hover:text-blue-400'
                    }`}>
                      {faq.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-blue-500 text-white rotate-180' 
                      : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-700/70 group-hover:text-blue-400'
                  }`}>
                    <svg
                      className="w-5 h-5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="pl-16">
                    <div className="w-full h-px bg-gradient-to-r from-gray-600 to-transparent mb-4"></div>
                    <p className="text-gray-300 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
 
      </div>
    </section>
  );
};

export default FAQSection;