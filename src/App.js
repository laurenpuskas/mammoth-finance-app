import React, { useState, useEffect } from 'react';

const frontendUrl =
  'https://api.github.com/repos/laurenpuskas/mammoth-frontend/issues?state=all';
const backendUrl =
  'https://api.github.com/repos/laurenpuskas/mammoth-backend/issues?state=all';

const headers = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
};

/**
 * Fetch all issues from both repositories
 */

function App() {
  // manage state for issues
  const [issues, setIssues] = useState([]);

  // fetch all issues
  useEffect(() => {
    async function fetchIssues() {
      try {
        const [frontendData, backendData] = await Promise.all([
          fetch(frontendUrl, headers).then((res) => {
            return res.json();
          }),
          fetch(backendUrl, headers).then((res) => {
            return res.json();
          }),
        ]);
        const allData = [...frontendData, ...backendData];
        console.log(allData);
        setIssues(allData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchIssues();
  }, []);

  if (!issues.length) return <div>No issues found.</div>;

  return (
    <>
      {issues.map((issue, index) => {
        return <div key={index}>{issue.url}</div>;
      })}
    </>
  );
}

export default App;
