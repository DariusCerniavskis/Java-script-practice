import Answer from "../models/answer.js";

export const createAnswer = async (req, res) => {
    const { answer_text, question_id } = req.body;

    const answer = new Answer({
        answer_text,
        question_id,
        user_id: req.user.userId,
    });

    await answer.save();

    res.json(answer);
};

export const getAnswers = async (req, res) => {
    const { questionId } = req.params;

    const answers = await Answer.find({
        question_id: questionId,
    });

    res.json(answers);
};

export const likeAnswer = async (req, res) => {
    const answer = await Answer.findById(req.params.id);

    const userId = req.user.userId;

    if (answer.likes.includes(userId)) {
        answer.likes.pull(userId);
    } else {
        answer.likes.push(userId);
        answer.dislikes.pull(userId);
    }

    await answer.save();

    res.json(answer);
};

export const dislikeAnswer = async (req, res) => {
    const answer = await Answer.findById(req.params.id);

    const userId = req.user.userId;

    if (answer.dislikes.includes(userId)) {
        answer.dislikes.pull(userId);
    } else {
        answer.dislikes.push(userId);
        answer.likes.pull(userId);
    }

    await answer.save();

    res.json(answer);
};
