import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const randomWords = [
  "orange", "orbit", "orchid", "ox", "octopus",
  "oval", "oracle", "orator", "oration", "orama"
];

app.get("/words", (req, res) => {
  res.json(randomWords);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});