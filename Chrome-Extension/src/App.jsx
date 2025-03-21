import { useState, useEffect } from "react";
// import "./App.css";

const App = () => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [motivationalStatus, setMotivationalStatus] = useState("You're doing great! Keep coding!");

  const showStatus = (message, isError = false) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 3000);
  };

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
          console.log("Extracted LeetCode code:", response.code);
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

  const openImprovementsPage = () => {
    if (code) {
      localStorage.setItem("leetcodeExtractedCode", code);
      window.open(chrome.runtime.getURL("improvements.html"), "_blank");
    } else {
      showStatus("No code to analyze yet", true);
    }
  };

  // useEffect(() => {
  //   extractCodeFromActiveTab();
  // }, []);

  return (
    <div className="container">
      <h2 className="heading ">LeetCode Companion</h2>

      <div className="image-container">
        <img src="/api/placeholder/300/200" alt="Coding motivation" className="motivational-image" />
      </div>

      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>


      <div className="motivation-box">{motivationalStatus}</div>

      <div className="button-container">
        <button onClick={extractCodeFromActiveTab} className="analyze-button">Analyze My Code</button>
        <button onClick={openImprovementsPage} className="improvements-button">View Code Improvements</button>
      </div>

      <div className={`status-message ${status.includes("Error") ? "error" : "success"}`}>
        {status}
      </div>
    </div>
  );
};

export default App;
