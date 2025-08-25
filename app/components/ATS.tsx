import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass = score > 69
    ? 'from-green-100 dark:from-green-900/30'
    : score > 49
      ? 'from-yellow-100 dark:from-yellow-900/30'
      : 'from-red-100 dark:from-red-900/30';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white dark:to-gray-800 rounded-2xl shadow-md w-full p-6 transition-colors duration-200`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow">
          <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ATS Score - {score}/100</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className={`flex items-start p-4 rounded-lg transition-all duration-200 ${
                suggestion.type === 'good' 
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                  : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
              }`}
            >
              <div className={`p-1 rounded-full ${
                suggestion.type === 'good' 
                  ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-300' 
                  : 'bg-yellow-100 dark:bg-yellow-800/50 text-yellow-600 dark:text-yellow-300'
              }`}>
                {suggestion.type === 'good' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <p className="text-sm ml-3 leading-relaxed">{suggestion.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-gray-700 italic">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  )
}

export default ATS