import { useState, useEffect } from "react";
import { fetchLeetCodeProblemDetails, extractProblemSlug } from "./api/fetch-content";
import MetaballsBackground from "./components/MetaballsBackground";
import HintSection from "./components/HintSection";
import InteractiveFeedback from "./components/InteractiveFeedback";
import SolutionSection from "./components/SolutionSection";

const LeetCodeTracker = () => {
  const [solutions, setSolutions] = useState([]);
  const [performance, setPerformance] = useState("Good");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    number: "",
    title: "",
    difficulty: "",
  });
  const [extractedCode, setExtractedCode] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  // Fetch current LeetCode problem details
  useEffect(() => {
    const fetchCurrentProblem = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the current tab URL
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const url = tab.url;

        // Extract the problem slug from the URL
        const problemSlug = extractProblemSlug(url);

        // Fetch problem details from the API or scrape the page
        const problemDetails = await fetchLeetCodeProblemDetails(problemSlug);

        // Update the current question state
        setCurrentQuestion({
          number: `#${problemDetails.questionId}`,
          title: problemDetails.title,
          difficulty: problemDetails.difficulty,
        });
      } catch (error) {
        console.error("Error fetching problem details:", error);
        setError("Failed to fetch problem details. Please try again.");
        setCurrentQuestion({
          number: "Error",
          title: "Error",
          difficulty: "Error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentProblem();
  }, []);

  // Rest of the component code...
};

export default LeetCodeTracker;