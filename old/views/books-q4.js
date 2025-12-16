import express from "express";
import pg from "pg";

const { Pool } = pg;
const app = express();
const PORT = 3000;

const db = new Pool({
    host: 'sathvikalladi',
    user: 'postgres',
    port: 5432,
    password: 'password1',
    database: 'Main Server'
})
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("books-q4.ejs");
});

app.get("/search", (req, res) => {
    const searchedTitle = req.body("searchedTitle");
    const result = db.query("SELECT * FROM books WHERE title = $1", [searchedTitle]);
    const bookDetails = result.rows[0];
    console.log(bookDetails);
});

app.listen(PORT, () => {
    console.log("Listening on port 3000.")
});



