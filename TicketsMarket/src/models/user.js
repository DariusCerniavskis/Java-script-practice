import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    moneyBalance: { type: Number, required: true },
    tickets: { type: Array, required: true },
});

export default mongoose.model("User", schema);

// POSTMAN
// create user
// {
//     name: { type: String, required: true },
//     surname: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     moneyBalance: { type: number, required: true }
// }
