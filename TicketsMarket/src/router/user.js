import express from "express";
import { createNewUser, login,newToken,getAllUsers, getUserById } from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/users", createNewUser);

router.get("/login", login);

router.get("/newToken",newToken)

router.get("/users", auth,getAllUsers);

router.get("/users/:id", auth, getUserById);

export default router;
