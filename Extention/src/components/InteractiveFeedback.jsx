import { useState, useEffect } from 'react';

const InteractiveFeedback = ({ extractedCode, performance, onExtractCode }) => {
  const [feedback, setFeedback] = useState('');
  const [showCode, setShowCode] = useState(false);
  
  // Generate feedback based on extracted code
  useEffect(() => {
    if (!extractedCode) return;
    
    // In a real implementation, this could analyze the code
    // For now, we'll use mock feedback
    const feedbackOptions = [
      "Great use of a Set for O(1) lookups! Time complexity is optimal.",
      "Consider using a more descriptive variable name than 'set'.",
      "Your solution is correct and efficient. Good job!"
    ];
    
    setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
    setShowCode(true);
  }, [extractedCode]);
  
  // Get performance icon
  const getPerformanceIcon = () => {
    switch (performance) {
      case 'Excellent':
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-green-900/40 rounded-full">
            <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'Good':
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-blue-900/40 rounded-full">
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v2a1 1 0 102 0V5zm-1 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 flex items-center justify-center bg-yellow-900/40 rounded-full">
            <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 mb-3 border border-zinc-800/60 shadow-lg flex-grow overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-zinc-300">Interactive Feedback</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${
            performance === 'Excellent' ? 'text-green-400' : 
            performance === 'Good' ? 'text-blue-400' : 
            'text-yellow-400'
          }`}>
            {performance}
          </span>
          {getPerformanceIcon()}
        </div>
      </div>
      
      {!extractedCode ? (
        <div className="flex flex-col items-center justify-center bg-zinc-800/40 rounded-lg p-4 flex-grow border border-zinc-700/30">
          <p className="text-sm text-zinc-400 text-center mb-3">
            Extract code from your current LeetCode problem to get instant feedback
          </p>
          <button 
            onClick={onExtractCode}
            className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-700/80 rounded-lg text-sm font-medium transition-colors"
          >
            Extract Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 flex-grow">
          {/* Code Preview */}
          <div className="bg-zinc-800/40 rounded-lg p-2 border border-zinc-700/30 flex-grow overflow-auto">
            <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap">
              {extractedCode}
            </pre>
          </div>
          
          {/* Feedback */}
          {feedback && (
            <div className="bg-purple-900/30 border border-purple-800/40 rounded-lg p-2">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-zinc-300">{feedback}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveFeedback;