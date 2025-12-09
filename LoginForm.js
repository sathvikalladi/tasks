import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("LoginForm.ejs");
});

app.post("/submit", (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    if(username.includes("@")) {
        if(password.length >= 8 && password) {

        }
    }
});

app.listen(PORT, () => {
    console.log("Listening on port 3000.")
});