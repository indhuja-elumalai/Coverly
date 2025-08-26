const model = require("../config/geminiConfig");

/**
 * generateText(prompt, opts)
 * - prompt: string
 * - opts: {maxOutputTokens, temperature}
 */
async function generateText(prompt, opts = {}) {
  try {
    const genOpts = {
      prompt: {
        text: prompt
      },
      ...(
        opts.generationConfig ? { generationConfig: opts.generationConfig } : {}
      )
    };

    // SDK call - follows the pattern for @google/generative-ai
    const response = await model.generateContent(prompt);
    // response handling - guard for shape differences
    if (response?.response?.text) return response.response.text();
    if (response?.text) return response.text();
    // fallback - inspect candidates
    if (response?.response?.candidates && response.response.candidates[0]) {
      const candidate = response.response.candidates[0];
      if (candidate?.content?.parts && candidate.content.parts[0]) {
        return candidate.content.parts[0].text || "";
      }
    }
    return "";
  } catch (err) {
    console.error("Gemini error:", err);
    throw err;
  }
}

async function generateResumeAndCover({ jobDescription, skills, experience, name, company, role }) {
  // Build two prompts (one for resume summary, one for cover letter)
  const resumePrompt = `
You are an expert resume writer and software recruiter.
Write a concise, ATS-friendly resume summary (3-4 lines) for:
Name: ${name || "Candidate"}
Role: ${role || jobDescription}
Skills: ${skills}
Experience: ${experience}
Tone: confident, specific, quantify impact where possible.
`;
  const coverPrompt = `
You are a professional cover-letter writer.
Write a tailored 3-paragraph cover letter for ${name || "Candidate"} applying for ${role || jobDescription} at ${company || "the company"}.
Highlight skills: ${skills}.
Mention a brief example achievement and a closing call-to-action.
Keep under 220 words.
`;

  const resumeText = await generateText(resumePrompt);
  const coverText = await generateText(coverPrompt);

  return { resume: resumeText.trim(), coverLetter: coverText.trim() };
}

module.exports = { generateResumeAndCover };
