// pages/api/bots/index.js
import { defaultBots } from "../../../lib/defaultBots";

let bots = [...defaultBots]; // In-memory storage (replace with DB in production)

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ bots });
  } else if (req.method === "POST") {
    const newBot = req.body;
    bots.push(newBot);
    res.status(201).json(newBot);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
