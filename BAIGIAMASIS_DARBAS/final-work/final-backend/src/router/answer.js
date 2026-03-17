import express from "express";
import auth from "../middleware/auth.js";

import {
    createAnswer,
    getAnswers,
    likeAnswer,
    dislikeAnswer,
} from "../controller/answer.js";

const router = express.Router();

router.post("/answer", auth, createAnswer);

router.get("/answers/:questionId", getAnswers);

router.post("/answer/:id/like", auth, likeAnswer);

router.post("/answer/:id/dislike", auth, dislikeAnswer);

export default router;
