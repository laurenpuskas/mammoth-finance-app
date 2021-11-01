import React, { useState, useEffect } from 'react';

const frontendUrl =
  'https://api.github.com/repos/laurenpuskas/mammoth-frontend/issues?state=all';
const backendUrl =
  'https://api.github.com/repos/laurenpuskas/mammoth-backend/issues?state=all';

const authLabel = 'authentication';
const paymentLabel = 'payments';

const headers = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
};

/**
 * Fetch all issues from both repositories
 */

function App() {
  // manage state for issues & potential errors
  const [issues, setIssues] = useState([]);
  const [errors, setErrors] = useState(null);

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
        setIssues(allData);
      } catch (err) {
        setErrors(err);
      }
    }

    fetchIssues();
  }, []);

  // filter function
  function issueFilter(issues, label) {
    const filterArr = issues.filter((issue) => issue.labels[0].name === label);
    return filterArr;
  }

  // filter for ALL open issues
  const openIssues = issues.filter((issue) => issue.state === 'open');

  // filter for ALL & OPEN issues with "authentication" epic
  const authIssuesTotal = issueFilter(issues, authLabel);
  const authIssuesOpen = issueFilter(openIssues, authLabel);

  // filter for ALL & OPEN issues with "payments" epic
  const paymentsIssuesTotal = issueFilter(issues, paymentLabel);
  const paymentsIssuesOpen = issueFilter(openIssues, paymentLabel);

  if (!issues.length) return <div>No issues found.</div>;

  return (
    <>
      {authLabel} issues OPEN: {authIssuesOpen.length}
      <br />
      {authLabel} issues TOTAL: {authIssuesTotal.length}
      <hr />
      {paymentLabel} issues OPEN: {paymentsIssuesOpen.length}
      <br />
      {paymentLabel} issues TOTAL: {paymentsIssuesTotal.length}
      {errors && <div>{errors}</div>}
    </>
  );
}

export default App;
