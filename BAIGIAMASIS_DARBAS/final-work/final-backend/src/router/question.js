import express from "express";
import {
    addQuestion,
    getQuestionByNumber,
    getAllQuestions,
} from "../controller/question.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/questions", auth, addQuestion);

router.get("/question", auth, getQuestionByNumber);

router.get("/questions", auth, getAllQuestions);

export default router;
