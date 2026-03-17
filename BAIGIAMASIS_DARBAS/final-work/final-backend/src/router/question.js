import express from "express";
import auth from "../middleware/auth.js";

import {
    getQuestions,
    addQuestion,
    deleteQuestion,
} from "../controller/question.js";

const router = express.Router();

router.get("/questions", getQuestions);

router.post("/ask", auth, addQuestion);

router.delete("/question/:id", auth, deleteQuestion);

export default router;
