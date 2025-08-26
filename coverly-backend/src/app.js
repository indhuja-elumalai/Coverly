const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const resumeRoutes = require("./routes/resumeRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));

app.use("/api/resume", resumeRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handler
app.use(errorHandler);

module.exports = app;
