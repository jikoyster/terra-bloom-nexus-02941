// backend/routes/ai.js
router.post("/ask", async (req, res) => {
  const reply = await askOllama(req.body.prompt);
  res.json({ reply });
});