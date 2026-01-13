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
      });// Meta webhook verification
      app.get("/webhook", (req, res) => {
        const VERIFY_TOKEN = "ankush123";

          const mode = req.query["hub.mode"];
            const token = req.query["hub.verify_token"];
              const challenge = req.query["hub.challenge"];

                if (mode === "subscribe" && token === VERIFY_TOKEN) {
                    console.log("Webhook verified");
                        return res.status(200).send(challenge);
                          }
                            return res.sendStatus(403);
                            });

                            // Receive messages
                            app.post("/webhook", (req, res) => {
                              console.log("Incoming message 👇");
                                console.log(JSON.stringify(req.body, null, 2));
                                  res.sendStatus(200);
                                  });