import { useState, useEffect } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [motivationalStatus, setMotivationalStatus] = useState("You're doing great! Keep coding!");

  // Function to show status message
  const showStatus = (message, isError = false) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 3000);
  };

  // Function to set a random motivational status
  const setRandomMotivation = () => {
    const motivations = [
      "You're doing excellent! Keep pushing forward!",
      "Great progress today! You're becoming a coding master!",
      "Consistency is key - and you're nailing it!",
      "Your dedication to problem-solving is impressive!",
      "You're on fire today! Keep that momentum going!"
    ];
    const randomIndex = Math.floor(Math.random() * motivations.length);
    setMotivationalStatus(motivations[randomIndex]);
  };

  // Function to extract code from active tab
  const extractCodeFromActiveTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (!activeTab.url.includes("leetcode.com")) {
        showStatus("This extension only works on LeetCode", true);
        return;
      }

      chrome.runtime.sendMessage({ action: "getCode" }, (response) => {
        if (response?.code) {
          setCode(response.code);
          console.log("Extracted LeetCode code:", response.code); // Log to console instead of showing
          showStatus("Code analyzed successfully!");
          setRandomMotivation();
        } else {
          chrome.tabs.sendMessage(activeTab.id, { action: "extractCode" }, (response) => {
            if (chrome.runtime.lastError) {
              showStatus("Error: Make sure you're on a LeetCode problem page", true);
            } else {
              showStatus("Analyzing your code... Please wait a moment and try again.");
            }
          });
        }
      });
    });
  };

  // Open improvements page in a new tab
  const openImprovementsPage = () => {
    if (code) {
      // Store code in local storage to access it from the new page
      localStorage.setItem('leetcodeExtractedCode', code);
      window.open(chrome.runtime.getURL('improvements.html'), '_blank');
    } else {
      showStatus("No code to analyze yet", true);
    }
  };

  // Extract code when component mounts (same as when popup opens)
  useEffect(() => {
    extractCodeFromActiveTab();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>LeetCode Companion</h2>
      
      {/* Motivational Image */}
      <div style={styles.imageContainer}>
        <img 
          src="/api/placeholder/300/200" 
          alt="Coding motivation" 
          style={styles.image}
        />
      </div>
      
      {/* Motivational Status */}
      <div style={styles.motivationBox}>
        {motivationalStatus}
      </div>
      
      {/* Actions */}
      <div style={styles.buttonContainer}>
        <button 
          onClick={extractCodeFromActiveTab} 
          style={styles.analyzeButton}
        >
          Analyze My Code
        </button>
        
        <button 
          onClick={openImprovementsPage} 
          style={styles.improvementsButton}
        >
          View Code Improvements
        </button>
      </div>
      
      {/* Status Message */}
      <div style={{
        ...styles.statusMessage,
        color: status.includes("Error") ? "#e53e3e" : "#38a169"
      }}>
        {status}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    background: "linear-gradient(135deg, #f0f5ff 0%, #f5f0ff 100%)",
    borderRadius: "8px",
    width: "384px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "16px",
    color: "#3182ce"
  },
  imageContainer: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
    display: "flex",
    justifyContent: "center"
  },
  image: {
    height: "128px",
    width: "auto",
    borderRadius: "4px"
  },
  motivationBox: {
    backgroundColor: "#3182ce",
    color: "white",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
    textAlign: "center",
    fontWeight: "500"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  analyzeButton: {
    padding: "12px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "8px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px"
  },
  improvementsButton: {
    padding: "12px 16px",
    backgroundColor: "#7e22ce",
    color: "white",
    borderRadius: "8px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px"
  },
  statusMessage: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    height: "20px"
  }
};

export default App;