import { useState, useEffect } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  // Function to show status message
  const showStatus = (message, isError = false) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 3000);
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
          showStatus("Code extracted successfully!");
        } else {
          chrome.tabs.sendMessage(activeTab.id, { action: "extractCode" }, (response) => {
            if (chrome.runtime.lastError) {
              showStatus("Error: Make sure you're on a LeetCode problem page", true);
            } else {
              showStatus("Extracting code... Please wait a moment and try again.");
            }
          });
        }
      });
    });
  };

  // Copy code to clipboard
  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard
        .writeText(code)
        .then(() => showStatus("Code copied to clipboard!"))
        .catch((err) => showStatus(`Failed to copy code: ${err}`, true));
    } else {
      showStatus("No code to copy", true);
    }
  };

  // Clear the code output
  const clearCode = () => {
    setCode("");
    showStatus("Cleared!");
  };

  // Extract code when component mounts (same as when popup opens)
  useEffect(() => {
    extractCodeFromActiveTab();
  }, []);

  return (
    <div style={{ width: 400, padding: 10, fontFamily: "Arial, sans-serif" }}>
      <h2>LeetCode Code Extractor</h2>
      <button onClick={extractCodeFromActiveTab} style={styles.button}>Extract Code</button>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="LeetCode code will appear here..."
        style={styles.textarea}
      />
      <div style={styles.buttonContainer}>
        <button onClick={copyToClipboard} style={styles.button}>Copy to Clipboard</button>
        <button onClick={clearCode} style={styles.button}>Clear</button>
      </div>
      <div style={{ color: status.includes("Error") ? "red" : "green", marginTop: 10, fontSize: 14 }}>
        {status}
      </div>
    </div>
  );
};

const styles = {
  textarea: {
    width: "100%",
    height: 200,
    margin: "10px 0",
    fontFamily: "monospace",
    padding: 5,
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    gap: 10,
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: "#0a84ff",
    color: "white",
    border: "none",
    borderRadius: 4,
    flexGrow: 1,
    textAlign: "center",
  },
};

export default App;
