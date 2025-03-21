import { useState } from 'react';

const SolutionSection = ({ currentQuestion }) => {
  const [activeSolution, setActiveSolution] = useState('optimal');
  
  // Get solution based on current question
  const getSolutions = () => {
    if (currentQuestion.title === "Contains Duplicate") {
      return {
        optimal: {
          code: `// Optimal solution using HashSet - O(n) time
function containsDuplicate(nums) {
  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}`,
          explanation: "This solution uses a HashSet for O(1) lookups. It iterates through the array once, checking if each number is already in the set. If it is, we've found a duplicate. If not, we add it to the set. This gives us O(n) time complexity where n is the length of the array, and O(n) space complexity in the worst case."
        },
        alternative: {
          code: `// Alternative solution using sorting - O(n log n) time
function containsDuplicate(nums) {
  // Sort the array first
  nums.sort((a, b) => a - b);
  
  // Check adjacent elements for duplicates
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i-1]) {
      return true;
    }
  }
  return false;
}`,
          explanation: "This alternative approach sorts the array first (O(n log n) time), then checks for adjacent duplicate elements in one pass (O(n) time). The overall time complexity is dominated by the sort: O(n log n). The space complexity is O(1) or O(log n) depending on the sorting implementation."
        }
      };
    }
    
    // Default solution if question not recognized
    return {
      optimal: {
        code: "// Solution code would appear here",
        explanation: "Explanation would appear here"
      },
      alternative: {
        code: "// Alternative solution would appear here",
        explanation: "Alternative explanation would appear here"
      }
    };
  };
  
  const solutions = getSolutions();
  
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 border border-zinc-800/60 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">Solution</h3>
        <div className="flex text-xs rounded-lg overflow-hidden border border-zinc-700/60">
          <button 
            onClick={() => setActiveSolution('optimal')}
            className={`px-2 py-1 ${activeSolution === 'optimal' ? 'bg-purple-900/70 text-purple-300' : 'bg-zinc-800/70 text-zinc-400'}`}
          >
            Optimal
          </button>
          <button 
            onClick={() => setActiveSolution('alternative')}
            className={`px-2 py-1 ${activeSolution === 'alternative' ? 'bg-purple-900/70 text-purple-300' : 'bg-zinc-800/70 text-zinc-400'}`}
          >
            Alternative
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {/* Code Block */}
        <div className="bg-zinc-800/40 rounded-lg p-2 border border-zinc-700/30 max-h-32 overflow-auto">
          <pre className="text-xs text-cyan-300 font-mono whitespace-pre-wrap">
            {solutions[activeSolution].code}
          </pre>
        </div>
        
        {/* Explanation */}
        <div className="bg-zinc-800/40 rounded-lg p-2 border border-zinc-700/30 max-h-24 overflow-auto">
          <div className="flex items-start">
            <svg className="w-4 h-4 text-purple-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-zinc-300">
              {solutions[activeSolution].explanation}
            </p>
          </div>
        </div>
        
        {/* Complexity */}
        <div className="flex justify-between text-xs text-zinc-400">
          <div className="flex items-center">
            <span className="mr-1">Time:</span>
            <span className="text-green-400">
              {activeSolution === 'optimal' ? 'O(n)' : 'O(n log n)'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">Space:</span>
            <span className="text-blue-400">
              {activeSolution === 'optimal' ? 'O(n)' : 'O(1)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;