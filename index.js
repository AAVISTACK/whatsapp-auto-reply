import express from "express";

const app = express();
app.use(express.json());

// ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("WhatsApp Auto Reply Server Running ✅");
  });

  // WEBHOOK VERIFY (Meta ke liye)
  app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "ankush123";

      const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
          const challenge = req.query["hub.challenge"];

            if (mode === "subscribe" && token === VERIFY_TOKEN) {
                return res.status(200).send(challenge);
                  } else {
                      return res.sendStatus(403);
                        }
                        });

                        // WEBHOOK POST (messages yaha aayenge)
                        app.post("/webhook", (req, res) => {
                          console.log("Incoming webhook:");
                            console.log(JSON.stringify(req.body, null, 2));
                              res.sendStatus(200);
                              });

                              const PORT = process.env.PORT || 3000;
                              app.listen(PORT, () => {
                                console.log("Server running on port", PORT);
                                });