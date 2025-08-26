// CommonJS for compatibility with @google/generative-ai examples
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.MODEL_NAME || "gemini-1.5-flash";
const model = genAI.getGenerativeModel({ model: modelName });

module.exports = model;
