import express from "express";
import {
    createNewUser,
    login,
    newToken,

    // getAllUsers,
    // getUserById,
    // addMoney,
    // getAllUsersDetailed,
} from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/registration", createNewUser);

router.post("/login", login);

router.get("/token", newToken);

// router.get("/users", auth, getAllUsers);

// router.get("/activeUser", auth, getUserById);

// router.put("/money", auth, addMoney);

// router.get("/usersDetailed", auth, getAllUsersDetailed);

router.get("/jwt/validate", auth, (req, res) => {
    console.log("Validacija");
    console.log(res);
    res.status(200).json({ message: "JWT is valid" });
});

export default router;
