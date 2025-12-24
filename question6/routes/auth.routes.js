import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateAuthInput } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validateAuthInput, register);
router.post("/login", validateAuthInput, login);

export default router;