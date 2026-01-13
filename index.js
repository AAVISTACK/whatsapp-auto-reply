import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 WhatsApp Auto Reply is LIVE");
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on port", PORT);
      });