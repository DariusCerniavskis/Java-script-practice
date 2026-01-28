import mongoose from "mongoose";

const schema = mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    toLocationPhotUrl: { type: String, required: true },
});

export default mongoose.model("Ticket", schema);



// POSTMAN
// create ticket
// {
// title: { type: String, required: true },
// price: { type: Number, required: true },
// fromLocation: { type: String, required: true },
// toLocation: { type: String, required: true },
// toLocationPhotUrl: { type: String, required: true },
// }

// parameters
// userId: { type: String, required: true }, (parameter)
