const aiService = require("../services/ai.service");

const MAX_CODE_LENGTH = parseInt(process.env.MAX_CODE_LENGTH || "10000", 10);

module.exports.getReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return res.status(400).send("Code string is required.");
    }

    if (code.length > MAX_CODE_LENGTH) {
      return res
        .status(400)
        .send(`Code exceeds maximum allowed limit of ${MAX_CODE_LENGTH} characters.`);
    }

    const response = await aiService(code, language || "javascript");

    res.send(response);
  } catch (err) {
    console.error("Error in getReview controller:", err);

    res
      .status(500)
      .send(err.message || "Internal Server Error during code review generation.");
  }
};