import 'dotenv/config'
import express from "express";
import todosRoutes from "./routes/todos.routes.js";
import authenticateUserRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/todos", todosRoutes);
app.use("/auth", authenticateUserRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));