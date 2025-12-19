import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Course from "./models/Course.js";

dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log(err));


// REGISTER
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.send("User already exists");
  }

  await User.create({ name, email, password });
  res.send("Registered successfully");
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.send("Invalid email or password");
  }

  res.send("Login successful");
});


// ADD COURSE
app.post("/api/courses", async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

// GET ALL COURSES
app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// DELETE COURSE
app.delete("/api/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.send("Course deleted");
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log(" Server running on port 5000");
});
