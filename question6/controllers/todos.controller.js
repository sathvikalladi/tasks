import db from "../db.js";

export const addTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  let imagePath = null;
  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
  }

  try {
    const taskResult = await db.query(
      "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING id",
      [title, userId]
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
};

export const deleteTodo = async (req, res) => {
  try {
    await db.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
    return res.json({ message: "Todo deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  try {
    if (title) {
      await db.query("UPDATE tasks SET title = $1 WHERE id = $2", [title, id]);
    }

    if (description) {
      await db.query(
        "UPDATE task_metadata SET description = $1 WHERE task_id = $2",
        [description, id]
      );
    }

    if (typeof is_completed === "boolean") {
      await db.query(
        "UPDATE task_metadata SET is_completed = $1 WHERE task_id = $2",
        [is_completed, id]
      );
    }

    if (req.file) {
      const imagePath = `/uploads/${req.file.filename}`;
      await db.query(
        "UPDATE task_metadata SET image_path = $1 WHERE task_id = $2",
        [imagePath, id]
      );
    }

    return res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Update failed" });
  }
};

export const searchTodos = async (req, res) => {
  const { q } = req.query;

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
      [`%${cleanQuery}%`]
    );

    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: "Search failed" });
  }
};