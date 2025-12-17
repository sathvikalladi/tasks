import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); 

app.get("/api/iss", async (req, res) => {
    try {
        const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        const data = await response.json();
        res.json(data);
      } catch (err) {
        console.log(err);
      }
})

app.get("/api/weather", async (req, res) => {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7&longitude=-74&current_weather=true");
        const data = await response.json();
        res.json(data);
      } catch (err) {
        console.log(err);
      }
})

app.get("/api/github", async (req, res) => {
    try {
        const response = await fetch("https://api.github.com/users/octocat");
        const data = await response.json();
        res.json(data);
      } catch (err) {
        console.log(err);
      }
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });