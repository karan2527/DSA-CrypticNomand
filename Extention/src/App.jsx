import { useState, useEffect } from 'react';

const LeetCodeTracker = () => {
  const [solutions, setSolutions] = useState([]);
  const [performance, setPerformance] = useState('Good');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for demonstration - in real extension, fetch from storage
  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        { id: 1, title: 'Two Sum', difficulty: 'Easy', timeComplexity: 'O(n)', spaceComplexity: 'O(n)', date: '2025-03-15' },
        { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', timeComplexity: 'O(n)', spaceComplexity: 'O(n)', date: '2025-03-17' },
        { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', timeComplexity: 'O(n)', spaceComplexity: 'O(min(m,n))', date: '2025-03-19' },
      ];
      setSolutions(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Calculate performance based on solutions
  useEffect(() => {
    if (solutions.length === 0) return;
    
    // Simple algorithm to determine performance level
    // In real extension, this would be more sophisticated
    const difficultyScore = solutions.reduce((acc, sol) => {
      if (sol.difficulty === 'Easy') return acc + 1;
      if (sol.difficulty === 'Medium') return acc + 2;
      if (sol.difficulty === 'Hard') return acc + 3;
      return acc;
    }, 0);
    
    if (difficultyScore > 5) {
      setPerformance('Excellent');
    } else if (difficultyScore > 3) {
      setPerformance('Good');
    } else {
      setPerformance('Can Be Improved');
    }
  }, [solutions]);

  // Get performance image based on rating
  const getPerformanceImage = () => {
    switch (performance) {
      case 'Excellent':
        return 'https://via.placeholder.com/150?text=Trophy';
      case 'Good':
        return 'https://via.placeholder.com/150?text=Thumbs+Up';
      case 'Can Be Improved':
        return 'https://via.placeholder.com/150?text=Growth';
      default:
        return 'https://via.placeholder.com/150?text=Neutral';
    }
  };

  // Extract code from current LeetCode page
  const extractCode = () => {
    // In the actual extension, this would use chrome.tabs API to extract code
    // For demo purposes, we'll just add a mock solution
    const newSolution = {
      id: solutions.length + 1,
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      timeComplexity: 'O(n+m)',
      spaceComplexity: 'O(1)',
      date: new Date().toISOString().split('T')[0]
    };
    
    setSolutions([...solutions, newSolution]);
  };

  // Redirect to detailed analysis page
  const viewDetailedAnalysis = () => {
    // In actual extension, this would open a new tab
    // chrome.tabs.create({ url: chrome.runtime.getURL("analysis.html") });
    alert("This would open the detailed analysis page");
  };

  return (
    <div className="w-80 bg-zinc-900 text-zinc-100 p-4 rounded-lg shadow-lg font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-green-400">LeetCode Tracker</h1>
        <div className="px-3 py-1 bg-zinc-800 rounded-full text-sm">
          {solutions.length} Solutions
        </div>
      </div>
      
      {/* Performance Summary */}
      <div className="bg-zinc-800 rounded-lg p-4 mb-4">
        <div className="text-center mb-2">
          <span className="text-zinc-400 text-sm">Your performance is</span>
          <h2 className={`text-2xl font-bold ${
            performance === 'Excellent' ? 'text-green-400' : 
            performance === 'Good' ? 'text-blue-400' : 
            'text-yellow-400'
          }`}>
            {performance}
          </h2>
        </div>
        
        <div className="flex justify-center my-3">
          <img 
            src={getPerformanceImage()} 
            alt={`${performance} performance`} 
            className="w-16 h-16 rounded-full bg-zinc-700 p-1"
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button 
          onClick={extractCode}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Extract Code
        </button>
        <button 
          onClick={viewDetailedAnalysis}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          View Analysis
        </button>
      </div>
      
      {/* Recent Solutions */}
      <div>
        <h3 className="text-sm text-zinc-400 mb-2">Recent Solutions</h3>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-5 w-5 border-2 border-zinc-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {solutions.slice(-3).reverse().map((solution) => (
              <div key={solution.id} className="bg-zinc-800 rounded-lg p-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium truncate">{solution.title}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    solution.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                    solution.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {solution.difficulty}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-1 flex justify-between">
                  <span>Time: {solution.timeComplexity}</span>
                  <span>Space: {solution.spaceComplexity}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeetCodeTracker;