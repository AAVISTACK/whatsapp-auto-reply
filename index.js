import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

        if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
            return res.status(200).send(challenge);
              }
                return res.sendStatus(403);
                });

                // Incoming message handler
                app.post("/webhook", async (req, res) => {
                  try {
                      const entry = req.body.entry?.[0];
                          const change = entry?.changes?.[0];
                              const value = change?.value;
                                  const message = value?.messages?.[0];

                                      if (message && message.text) {
                                            const from = message.from;

                                                  await axios.post(
                                                          `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
                                                                  {
                                                                            messaging_product: "whatsapp",
                                                                                      to: from,
                                                                                                text: {
                                                                                                            body: `Hello 👋
                                                                                                            Thanks for contacting Digicraft Solutions.

                                                                                                            Reply with:
                                                                                                            1️⃣ Website
                                                                                                            2️⃣ SEO
                                                                                                            3️⃣ Ads`
                                                                                                                      }
                                                                                                                              },
                                                                                                                                      {
                                                                                                                                                headers: {
                                                                                                                                                            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                                                                                                                                                                        "Content-Type": "application/json"
                                                                                                                                                                                  }
                                                                                                                                                                                          }
                                                                                                                                                                                                );
                                                                                                                                                                                                    }

                                                                                                                                                                                                        res.sendStatus(200);
                                                                                                                                                                                                          } catch (err) {
                                                                                                                                                                                                              console.error(err);
                                                                                                                                                                                                                  res.sendStatus(200);
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    });

                                                                                                                                                                                                                    app.listen(PORT, () => {
                                                                                                                                                                                                                      console.log("Server running on port", PORT);
                                                                                                                                                                                                                      })