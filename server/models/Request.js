import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  websiteType: { type: String, required: true },
  budget: { type: Number, required: true },
  message: { type: String },
  templateInterested: { type: String },
}, { timestamps: true });


export default mongoose.model("Request", requestSchema);
