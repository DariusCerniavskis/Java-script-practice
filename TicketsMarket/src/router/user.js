import express from "express";
import {
    createNewUser,
    login,
    newToken,
    getAllUsers,
    getUserById,
    addMoney,
    getAllUsersDetailed,
} from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/users", createNewUser);

router.get("/login", login);

router.get("/token", newToken);

router.get("/users", auth, getAllUsers);

router.get("/activeUser", auth, getUserById);

router.put("/money", auth, addMoney);

router.get("/usersDetailed", auth, getAllUsersDetailed);

export default router;
