import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, TodoModel } from "./db.js";

const JWT_SECRET = "abshyvg1@2347824";

await mongoose.connect(
  "mongodb+srv://Shubham:29Sbishnoi%4029@cluster0.rzvli.mongodb.net/ToDo-app-data"
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

const app = express();
app.use(express.json());

// Non-authenticated routes

app.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use. Please use a different email.",
      });
    }

    const newUser = await UserModel.create({ email, password, name });
    res.json({
      message: "Signup successful!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      return res.json({
        message: "Signin successful",
        token: token,
      });
    } else {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({
      message: "Signin failed",
      error: error.message,
    });
  }
});

// Auth middleware

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    res.status(403).json({
      message:
        error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }
}

// Authenticated routes

app.post("/todo", auth, async (req, res) => {
  const { userId } = req;
  const { title } = req.body;

  try {
    const todo = await TodoModel.create({
      title,
      userId,
    });

    res.json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({
      message: "Failed to create todo",
      error: error.message,
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  try {
    const { userId } = req;
    const todos = await TodoModel.find({ userId });

    res.json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
