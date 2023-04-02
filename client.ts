import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const dataset: Object[] = [];
app.post("/test", function (req: Request, res: Response) {
  const data = req.body;
  dataset.push(data);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.json({
    data: dataset
  });
});

app.listen(5000, () => console.log("Listening on port 5000"));
