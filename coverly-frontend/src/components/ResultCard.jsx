import React from "react";

export default function ResultCard({ result, loading }) {
  if (loading) return <div className="card"><p>Generating... ⏳</p></div>;
  if (!result) return <div className="card"><p>Enter details and click Generate.</p></div>;
  if (result.error) return <div className="card error">{result.error}</div>;

  return (
    <div className="card">
      <h3>Resume Summary</h3>
      <pre className="output">{result.resume || result?.data?.resume}</pre>

      <h3>Cover Letter</h3>
      <pre className="output">{result.coverLetter || result?.data?.coverLetter}</pre>

      <div className="actions">
        <button onClick={() => navigator.clipboard.writeText(result.resume || result?.data?.resume || "")}>Copy Resume</button>
        <button onClick={() => navigator.clipboard.writeText(result.coverLetter || result?.data?.coverLetter || "")}>Copy Cover Letter</button>
      </div>
    </div>
  );
}
