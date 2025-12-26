import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  templateName: String,
  budget: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Request", requestSchema);
