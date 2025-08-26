import React, { useState } from "react";
import Header from "./components/Header";
import ResumeForm from "./components/ResumeForm";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="page">
      <Header />
      <main className="container">
        <ResumeForm setResult={setResult} setLoading={setLoading} />
        <ResultCard result={result} loading={loading} />
      </main>
      <footer className="footer">Built with ❤️ · Coverly</footer>
    </div>
  );
}
