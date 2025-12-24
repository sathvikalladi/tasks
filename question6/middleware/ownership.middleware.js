import db from "../db.js";

export const verifyTodoOwner = async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user.userId;

  const result = await db.query("SELECT user_id FROM tasks WHERE id = $1", [todoId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (result.rows[0].user_id !== userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  next();
};