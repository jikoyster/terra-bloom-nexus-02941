const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * POST /api/ai/chat
 * Body:
 * {
 *   "prompt": "your question here"
 * }
 */
exports.chat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt is required and must be a string"
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.status(200).json({
      reply: response.output_text
    });
  } catch (error) {
    console.error("OpenAI chat error:", error);
    res.status(500).json({
      error: "Failed to generate AI response"
    });
  }
};

/**
 * POST /api/ai/soil-recommendation
 * Body:
 * {
 *   "soil": {
 *     "ph_level": 5.2,
 *     "nitrogen": 10,
 *     "phosphorus": 8,
 *     "potassium": 6,
 *     "organic_matter": 2.1
 *   }
 * }
 */
exports.soilRecommendation = async (req, res) => {
  try {
    const { soil } = req.body;

    if (!soil) {
      return res.status(400).json({
        error: "Soil data is required"
      });
    }

    const {
      ph_level,
      nitrogen,
      phosphorus,
      potassium,
      organic_matter
    } = soil;

    const prompt = `
You are an agricultural expert.

Soil Test Results:
- pH Level: ${ph_level}
- Nitrogen: ${nitrogen}
- Phosphorus: ${phosphorus}
- Potassium: ${potassium}
- Organic Matter: ${organic_matter}

Tasks:
1. Explain the soil condition in simple farmer-friendly terms.
2. Recommend fertilizers or soil amendments.
3. Suggest improvements to soil health.
4. Return recommendations in bullet points.
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.status(200).json({
      recommendation: response.output_text
    });
  } catch (error) {
    console.error("OpenAI soil recommendation error:", error);
    res.status(500).json({
      error: "Failed to generate soil recommendation"
    });
  }
};
