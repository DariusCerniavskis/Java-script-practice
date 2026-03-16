import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: false },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: "" },
    quizDate: { type: String, required: false, default: "" },
    quizTime: { type: String, required: false, default: "" },
    lastAnswered: { type: Number, required: false, default: 0 },
    isAdmin: { type: Boolean, required: false, default: false },
    rating: { type: Number, required: false, default: 0 },
});

export default mongoose.model("User", schema);

// pass hed123
