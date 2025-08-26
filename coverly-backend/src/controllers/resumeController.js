// controllers/resumeController.js
import { generateResumeAndCover } from "../services/resumeService.js";

export async function generateResume(req, res, next) {
  try {
    const { jobDescription, skills, experience, name, company, role } = req.body;

    if (!jobDescription && !role) {
      return res
        .status(400)
        .json({ success: false, message: "Provide jobDescription or role." });
    }

    const result = await generateResumeAndCover({
      jobDescription,
      skills,
      experience,
      name,
      company,
      role,
    });

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
