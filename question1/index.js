import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await validateUser(username, password);
        res.json({ success: true, user });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

function validateUser(username, password) {
    return new Promise((resolve, reject) => {
        if (!/^[^@]+@[^@]+\.com$/.test(username)) {
            return reject("Username must be a valid email");
        }
        if (!/^.{8,}$/.test(password)) {
            return reject("Password must be at least 8 characters");
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return reject("Password must include a special character");
        }

        resolve({ username, password });
    });
}