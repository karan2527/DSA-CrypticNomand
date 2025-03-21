import { useState } from 'react';

const HintSection = ({ currentQuestion }) => {
  const [showHints, setShowHints] = useState(false);
  
  // Mock hints based on current question
  const getHints = () => {
    if (currentQuestion.title === "Contains Duplicate") {
      return [
        "Consider using a data structure that can check for existence quickly",
        "Think about Set or HashMap for O(1) lookups",
        "Try sorting the array first as an alternative approach"
      ];
    }
    return ["No hints available for this question"];
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-3 mb-3 border border-zinc-800/60 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-zinc-300">Hints</h3>
        <button 
          onClick={() => setShowHints(!showHints)}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          {showHints ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {showHints ? (
        <div className="space-y-2">
          {getHints().map((hint, index) => (
            <div key={index} className="bg-zinc-800/40 p-2 rounded text-xs text-zinc-300 border border-zinc-700/30">
              <span className="text-purple-400 mr-1">Hint {index + 1}:</span> {hint}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-800/40 p-3 rounded text-center text-xs text-zinc-400 border border-zinc-700/30">
          Click "Show" to reveal hints for this problem
        </div>
      )}
    </div>
  );
};

export default HintSection;