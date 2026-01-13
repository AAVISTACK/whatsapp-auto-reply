import express from "express";

const app = express();
app.use(express.json());

// health check / root
app.get("/", (req, res) => {
  res.status(200).send("WhatsApp Auto Reply Server Running ✅");
  });

  // webhook verify
  app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "ankush123";

      const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
          const challenge = req.query["hub.challenge"];

            if (mode === "subscribe" && token === VERIFY_TOKEN) {
                return res.status(200).send(challenge);
                  }
                    return res.sendStatus(403);
                    });

                    // webhook receiver
                    app.post("/webhook", (req, res) => {
                      console.log("Webhook received");
                        console.log(JSON.stringify(req.body, null, 2));
                          res.sendStatus(200);
                          });

                          /**
                           * 🚨 MOST IMPORTANT LINE
                            * Railway injects PORT automatically
                             */
                             const PORT = process