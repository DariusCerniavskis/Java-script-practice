import mongoose from "mongoose";

const schema = mongoose.Schema({
  id: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  imgUrl: { type: String, required: true },
});

export default mongoose.model("Car", schema);
