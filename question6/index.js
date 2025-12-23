import 'dotenv/config'
import express from "express";
import todosRoutes from "./routes/todos.js";
import authenticateUserRoutes from "./routes/authenticateUser.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/todos", todosRoutes);
app.use("/auth", authenticateUserRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));