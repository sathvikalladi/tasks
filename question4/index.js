import express from "express";
import db from './db.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/bookByTitle", async (req, res) => {
    const searchedTitle = req.query.title;

    try {
        const result = await db.query("SELECT * FROM books WHERE LOWER(title) = $1", [searchedTitle.toLowerCase()]);
        
        if(result.rows.length == 0) {
            return res.json({ error: "Book not found" });
        } else {
            const bookDetails = result.rows[0];
            return res.json(bookDetails);
        }
    } catch(err) {
        console.log(err);
    }
});

app.get("/booksByGenre", async (req, res) => {
    const searchedGenre = req.query.genre;

    try {
        const result = await db.query("SELECT * FROM books WHERE LOWER(genre) = $1", [searchedGenre.toLowerCase()]);
        
        if(result.rows.length == 0) {
            return res.json({ error: "No books with this genre found" });
        } else {
            return res.json(result.rows);
        }
    } catch(err) {
        console.log(err);
    }
});

app.post("/addBook", async (req, res) => {
    // const title = req.body.title;
    // const genre = req.body.genre;
    const title = "hobbit";
    const genre = "fantasy";

    try {
        const result = await db.query("SELECT * FROM books WHERE title = $1", [title]);
        if(result.rows.length == 0) {
            const finalResult = await db.query("INSERT INTO books (title, genre) VALUES ($1, $2)", [title, genre]);
            res.json({ message: "Book added" });
        } else {
            res.json({ error: "Book already exists" });
        }
    } catch(err) {
        console.log(err);
    }
});

app.post("/deleteBook", async (req, res) => {
    // const title = req.body.title;
    const title = "hobbit";

    try {
        const result = await db.query("SELECT * FROM books WHERE title = $1", [title]);
        if(result.rows.length == 0) {
            res.json({ error: "Book not found" });
        } else {
            const finalResult = await db.query("DELETE FROM books WHERE title = $1", [title]);
            res.json({ message: "Book deleted" });
        }
    } catch(err) {
        console.log(err);
    }
});

app.post("/updateBook", async (req, res) => {
    // const originalTitle = req.body.originalTitle;
    // const newTitle = req.body.newTitle;
    // const newGenre = req.body.newGenre;

    const originalTitle = "calc 101";
    const newTitle = "math 101";
    const newGenre = "math";

    try {
        const result = await db.query("SELECT * FROM books WHERE title = $1", [originalTitle]);
        if(result.rows.length == 0) {
            res.json({ error: "Book not found" });
        } else {
            const finalResult = await db.query("UPDATE books SET title = $2, genre = $3 WHERE title = $1", [originalTitle, newTitle, newGenre]);
            res.json({ message: "Book updated" });
        }
    } catch(err) {
        console.log(err);
    }

});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });