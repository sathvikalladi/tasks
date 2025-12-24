import express from "express";

import { authenticateJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { validateTodo } from "../middleware/validate.middleware.js";
import { verifyTodoOwner } from "../middleware/ownership.middleware.js";

import { addTodo, updateTodo, deleteTodo, searchTodos } from "../controllers/todos.controller.js";

const router = express.Router();


router.post("/add", authenticateJWT, upload.single("image"), validateTodo, addTodo);

router.delete("/delete/:id", authenticateJWT, verifyTodoOwner, deleteTodo);

router.patch("/update/:id", authenticateJWT, verifyTodoOwner, upload.single("image"), updateTodo);

router.get("/search", authenticateJWT, verifyTodoOwner, searchTodos);


export default router;