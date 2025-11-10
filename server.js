import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

app.post("/recharge", (req, res) => {
  const { userId, amount } = req.body;
  const newRequest = { userId, amount, status: "pending" };

  // Save to recharges.json
  let recharges = [];
  if (fs.existsSync("recharges.json")) {
    recharges = JSON.parse(fs.readFileSync("recharges.json", "utf8"));
  }
  recharges.push(newRequest);
  fs.writeFileSync("recharges.json", JSON.stringify(recharges, null, 2));

  res.json({ success: true, message: "Recharge submitted successfully." });
});

app.get("/recharges", (req, res) => {
  if (fs.existsSync("recharges.json")) {
    const data = JSON.parse(fs.readFileSync("recharges.json", "utf8"));
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
