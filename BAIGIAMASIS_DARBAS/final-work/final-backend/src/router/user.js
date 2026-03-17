import express from "express";
import { register, login } from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/registration", register);
router.post("/login", login);

router.get("/jwt/validate", auth, (req, res) => {
    res.status(200).json({ message: "JWT is valid" });
});

export default router;
