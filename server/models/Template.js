import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: String,
  type: String,
  style: String,
  price: Number,
  demoUrl: String,
  image: String,
});

export default mongoose.model("Template", templateSchema);
