import axios from "axios";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface WebHook {
  payloadurl: string;
  secret: string;
}

interface WebHooks {
  COMMIT: WebHook[];
  PUSH: WebHook[];
  MERGE: WebHook[];
}
const webhooks: WebHooks = {
  COMMIT: [],
  PUSH: [],
  MERGE: []
};

app.post("/api/webhook", (req: Request, res: Response) => {
  const { payloadurl, secret, events } = req.body;
  events.forEach((event: "COMMIT" | "PUSH" | "MERGE") => {
    webhooks[event].push({
      payloadurl,
      secret
    });
  });
  res.json({ message: "Created webhook" });
});

app.post("/api/eventtry", (req: Request, res: Response) => {
  const {
    type,
    data
  }: {
    type: "COMMIT" | "PUSH" | "MERGE";
    data: string;
  } = req.body;
  setTimeout(() => {
    const list = webhooks[type];
    list.forEach(async (listItem) => {
      const webhook = listItem;
      const { payloadurl, secret } = webhook;
      try {
        console.log(payloadurl, data);

        await axios.post(payloadurl, data, {
          headers: {
            "x-secret": secret
          }
        });
      } catch (err) {}
    });
  }, 0);
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
