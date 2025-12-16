import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const currentStatus = "submit"
    res.render("LoginForm-q1.ejs", {
        status: currentStatus
    });
});

app.post("/submit", (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];

    setTimeout(() => {
        if(/^[^@]+@[^@]+\.com$/.test(username) == false) {
            console.log("password must include 8 letters.");
        }
        if(/^.{8,}$/.test(password) == false) {
            console.log("password must include 8 letters.");
        }
        if(/[^a-zA-Z0-9]/.test(password) == false) {
            console.log("username must be of an email type.");
        }
    
        const currentStatus = "submit";
        res.render("LoginForm-q1.ejs", {
            status: currentStatus
        });
    }, 3000);
});

app.listen(PORT, () => {
    console.log("Listening on port 3000.")
});