import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(cors({ origin: "http://localhost:5173" }));  // allow your React frontend
app.use(bodyParser.json());

import resumeRoutes from "./routes/resumeRoutes.js";

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port http://localhost:${PORT}`);
});
