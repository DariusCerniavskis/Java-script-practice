import mongoose from "mongoose";

const schema = mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        ref: "User",
    },

    reatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Question", schema);
