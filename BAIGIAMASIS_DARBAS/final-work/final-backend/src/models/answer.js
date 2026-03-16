import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: true },
    questionId: { type: String, required: true },
    userId: { type: String, required: true },
    answerNumber: { type: Number, required: true },
    isCorrectAnswer: { type: Boolean, required: true },
});

export default mongoose.model("Answer", schema);
