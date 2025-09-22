import express from "express";
import { login, registerStudent } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post('/register-student', registerStudent);

export default authRouter;
