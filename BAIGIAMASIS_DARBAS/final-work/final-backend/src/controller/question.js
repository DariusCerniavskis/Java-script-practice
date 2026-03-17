import QuestionModel from "../models/question.js";
import { v4 as uuid } from "uuid";

export const addQuestion = async (req, res) => {
    const { questionText, userId } = req.body;

    if (!questionText) {
        return res.status(400).json({
            message: "Question text is required",
        });
    }

    const question = new QuestionModel({
        id: uuid(),
        questionText: questionText,
        userId: userId,
    });

    await question.save();

    return res.status(201).json({
        message: "Question created",
        question,
    });
};

export const getQuestions = async (req, res) => {
    const questions = await QuestionModel.find();

    console.log("Klausimai");
    console.log(questions);

    return res.json(questions);
};

export const deleteQuestion = async (req, res) => {
    const id = req.params.id;

    await QuestionModel.findOneAndDelete({ id });

    return res.json({
        message: "Question deleted",
    });
};
