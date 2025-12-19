import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  desc: String
});

export default mongoose.model("Course", courseSchema);
