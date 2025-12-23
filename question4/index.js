import express from "express";
import db from "./db.js";

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

app.get("/bookByTitle", async (req, res, next) => {
    try {
        const searchedTitle = req.query.title;

        if (!searchedTitle) {
            throw new AppError("Title query parameter is required", 400);
        }

        const result = await db.query(
            "SELECT * FROM books WHERE LOWER(title) = $1",
            [searchedTitle.toLowerCase()]
        );

        if (result.rows.length === 0) {
            throw new AppError("Book not found", 404);
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

app.get("/booksByGenre", async (req, res, next) => {
    try {
        const searchedGenre = req.query.genre;

        if (!searchedGenre) {
            throw new AppError("Genre query parameter is required", 400);
        }

        const result = await db.query(
            "SELECT * FROM books WHERE LOWER(genre) = $1",
            [searchedGenre.toLowerCase()]
        );

        if (result.rows.length === 0) {
            throw new AppError("No books with this genre found", 404);
        }

        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

app.post("/addBook", async (req, res, next) => {
    try {
        const { title, genre } = req.body;

        if (!title || !genre) {
            throw new AppError("Title and genre are required", 400);
        }

        const result = await db.query(
            "SELECT * FROM books WHERE title = $1",
            [title]
        );

        if (result.rows.length > 0) {
            throw new AppError("Book already exists", 409);
        }

        await db.query(
            "INSERT INTO books (title, genre) VALUES ($1, $2)",
            [title, genre]
        );

        return res.status(201).json({ message: "Book added" });

    } catch (err) {
        next(err);
    }
});

app.post("/deleteBook", async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title) {
            throw new AppError("Title is required", 400);
        }

        const result = await db.query(
            "SELECT * FROM books WHERE title = $1",
            [title]
        );

        if (result.rows.length === 0) {
            throw new AppError("Book not found", 404);
        }

        await db.query(
            "DELETE FROM books WHERE title = $1",
            [title]
        );

        res.json({ message: "Book deleted" });
    } catch (err) {
        next(err);
    }
});

app.post("/updateBook", async (req, res, next) => {
    try {
        const { originalTitle, newTitle, newGenre } = req.body;

        if (!originalTitle || !newTitle || !newGenre) {
            throw new AppError("All fields are required", 400);
        }

        const result = await db.query(
            "SELECT * FROM books WHERE title = $1",
            [originalTitle]
        );

        if (result.rows.length === 0) {
            throw new AppError("Book not found", 404);
        }

        await db.query(
            "UPDATE books SET title = $2, genre = $3 WHERE title = $1",
            [originalTitle, newTitle, newGenre]
        );

        res.json({ message: "Book updated" });
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err);

    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(status).json({ error: message });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});