import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    moneyBalance: { type: String, required: true },
    tickets: { type: Array, required: true },
});

export default mongoose.model("User", schema);
