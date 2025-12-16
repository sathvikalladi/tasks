import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const randomWords = ["orange", "orbit", "orchid", "ox", "octopus", "oval", "oracle", "orator", "oration", "orama"]

    res.render("SearchBar-q2.ejs", {
        words: randomWords
    });
});

app.listen(PORT, () => {
    console.log("Listening on port 3000.")
});