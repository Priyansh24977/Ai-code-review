const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({
        message: "Code is required"
      });
    }

    const response = await aiService(code);

    res.json(response);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};