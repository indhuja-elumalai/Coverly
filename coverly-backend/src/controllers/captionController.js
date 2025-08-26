import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/caption/generate
export const generateCaption = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send prompt with image
    const result = await model.generateContent([
      {
        role: "user",
        parts: [
          { text: "Generate a short, engaging caption for this image:" },
          { inlineData: { mimeType: "image/png", data: imageUrl } } // assumes base64 image
        ]
      }
    ]);

    const caption = result.response.text();
    res.json({ caption });

  } catch (error) {
    console.error("❌ Caption generation error:", error);
    res.status(500).json({ error: "Failed to generate caption" });
  }
};
