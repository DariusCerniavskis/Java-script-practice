import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: true },
    number: { type: Number, required: true },
    title: { type: String, required: true },
    answers: { type: Array, required: true },
 
});

export default mongoose.model("Question", schema);

