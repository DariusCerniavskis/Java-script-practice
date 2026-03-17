import mongoose from "mongoose";

const schema = mongoose.Schema({
    answer_text: {
        type: String,
        required: true,
    },

    question_id: {
        type: String,
        ref: "Question",
    },

    user_id: {
        type: String,
        ref: "User",
    },

    date: {
        type: Date,
        default: Date.now,
    },

    likes: [
        {
            type: String,
            ref: "User",
        },
    ],

    dislikes: [
        {
            type: String,
            ref: "User",
        },
    ],
});

export default mongoose.model("Answer", schema);
