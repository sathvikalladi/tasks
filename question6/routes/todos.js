import express from "express";
import db from "../db.js";
import { upload } from "../multerConfig.js";

const router = express.Router();

router.post("/add", upload.single("image"), async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description required" });
    }

    let imagePath;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    } else {
        imagePath = null;
    }

    try {
        const taskResult = await db.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING id",
            [title]
        );
        
        const newTaskId = taskResult.rows[0].id;
    
        await db.query(
            "INSERT INTO task_metadata (task_id, description, image_path) VALUES ($1, $2, $3)",
            [newTaskId, description, imagePath]
        );
        
        return res.json({ message: "Todo added", imagePath });
    } catch (err) {
        return res.status(500).json({ error: "Failed to add todo" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await db.query(
            "DELETE FROM tasks WHERE id = $1",
            [req.params.id]
        );
        return res.json({ message: "Todo deleted" });
    } catch (err) {
        return res.status(500).json({ error: "Delete failed" });
    }
});

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { is_completed } = req.body;

    try {
        await db.query(
            "UPDATE task_metadata SET is_completed = $1 WHERE task_id = $2",
            [is_completed, id]
        );
        return res.json({ message: "Status updated" });
    } catch (err) {
        return res.status(500).json({ error: "Update failed" });
    }
});

router.get("/search", async (req, res) => {
    let { q } = req.query;
    if (!q) return res.json([]);

    const cleanQuery = q
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .toLowerCase();

    try {
        const result = await db.query(
            `SELECT t.id, t.title, m.description, m.is_completed
             FROM tasks t
             JOIN task_metadata m ON t.id = m.task_id
             WHERE LOWER(t.title) LIKE $1`,
            [`%${cleanQuery.toLowerCase()}%`]
        );
        return res.json(result.rows);
    } catch (err) {
        return res.status(500).json({ error: "Search failed" });
    }
});

export default router;