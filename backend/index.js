const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/transactions", (req, res) => {
  res.json([
    "Donasi 0.1 ETH",
    "Donasi 0.3 ETH",
    "Donasi 0.5 ETH"
  ]);
});

app.listen(5000, () => {
  console.log("Backend running di http://localhost:5000");
});
