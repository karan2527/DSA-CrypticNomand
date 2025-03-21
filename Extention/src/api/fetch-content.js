/**
 * Fetches LeetCode problem details from a third-party API or scrapes the page if the API fails.
 * @param {string} problemSlug - The slug of the problem (e.g., "two-sum").
 * @returns {Promise<Object>} - The problem details (title, difficulty, content, etc.).
 */
export const fetchLeetCodeProblemDetails = async (problemSlug) => {
	try {
	  console.log("Fetching details for problem slug:", problemSlug);
  
	  // Try fetching from the API first
	  const apiResponse = await fetchWithRetry(
		`https://algolistapi.vercel.app/leetcode/${problemSlug}`
	  );
  
	  if (!apiResponse.ok) {
		throw new Error(`Request failed with status ${apiResponse.status}`);
	  }
  
	  const apiData = await apiResponse.json();
	  console.log("API Response:", apiData);
  
	  if (!apiData || !apiData.title) {
		throw new Error("No question data found in the API response.");
	  }
  
	  return {
		questionId: apiData.questionId,
		title: apiData.title,
		difficulty: apiData.difficulty,
		content: apiData.content,
	  };
	} catch (apiError) {
	  console.error("API Error:", apiError);
  
	  // Fallback to scraping the page if the API fails
	  console.log("Falling back to scraping the page...");
	  const scrapedData = await scrapeLeetCodePage(problemSlug);
  
	  if (!scrapedData) {
		throw new Error("Failed to scrape problem details.");
	  }
  
	  return scrapedData;
	}
  };
  
  /**
   * Scrapes problem details directly from the LeetCode page.
   * @param {string} problemSlug - The slug of the problem (e.g., "two-sum").
   * @returns {Promise<Object>} - The scraped problem details.
   */
  const scrapeLeetCodePage = async (problemSlug) => {
	try {
	  // Inject a script into the page context to scrape problem details
	  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	  const injectionResults = await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => {
		  const title = document.querySelector('[data-cy="question-title"]')?.textContent || "Unknown";
		  const difficulty = document.querySelector('[diff]')?.textContent || "Unknown";
		  const content = document.querySelector('.question-content')?.innerHTML || "No content available.";
  
		  return {
			questionId: "0",
			title,
			difficulty,
			content,
		  };
		},
	  });
  
	  if (!injectionResults || !injectionResults[0]?.result) {
		throw new Error("Failed to scrape problem details.");
	  }
  
	  return injectionResults[0].result;
	} catch (scrapeError) {
	  console.error("Scraping Error:", scrapeError);
	  return null;
	}
  };
  
  /**
   * Fetches data from a URL with retry logic.
   * @param {string} url - The URL to fetch.
   * @param {number} retries - Number of retry attempts (default: 3).
   * @param {number} delay - Delay between retries in milliseconds (default: 1000).
   * @returns {Promise<Response>} - The fetch response.
   */
  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
	for (let i = 0; i < retries; i++) {
	  try {
		const response = await fetch(url);
  
		if (!response.ok) {
		  throw new Error(`Request failed with status ${response.status}`);
		}
  
		return response;
	  } catch (error) {
		if (i === retries - 1) {
		  throw error;
		}
		await new Promise((resolve) => setTimeout(resolve, delay));
	  }
	}
  };