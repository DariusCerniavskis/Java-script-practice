import express from "express";
import { createNewUser, login } from "../controller/user.js";

const router = express.Router();

router.post("/users", createNewUser);

router.get("/login", login);

export default router;
