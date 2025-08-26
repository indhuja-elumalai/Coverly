import React, { useState } from "react";
import { generateResume } from "../api/api";

export default function ResumeForm({ setResult, setLoading }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    jobDescription: "",
    skills: "",
    experience: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.jobDescription) {
      setError("Name and Job Description are required.");
      return;
    }
    setError("");

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        role: form.role || form.jobDescription,
        company: form.company,
        jobDescription: form.jobDescription,
        skills: form.skills,
        experience: form.experience,
      };

      const res = await generateResume(payload);
      setResult(res.data);
    } catch (err) {
      setResult({ error: "❌ Failed to generate resume. Check console for details." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Resume Generator</h2>

      {error && <p className="error-msg">{error}</p>}

      <div className="row">
        <input
          name="name"
          placeholder="Full name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Target role (optional)"
          value={form.role}
          onChange={handleChange}
        />
      </div>

      <input
        name="company"
        placeholder="Company (for cover letter)"
        value={form.company}
        onChange={handleChange}
      />

      <textarea
        name="jobDescription"
        placeholder="Job description (paste text or title) *"
        value={form.jobDescription}
        onChange={handleChange}
        required
        rows={4}
      />

      <input
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience (e.g., '2 years')"
        value={form.experience}
        onChange={handleChange}
      />

      <button className="btn" type="submit">
        Generate
      </button>
    </form>
  );
}
