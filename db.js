import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

const TodoSchema = new Schema({
  description: String,
  done: Boolean,
  userId: ObjectId,
});

export const UserModel = mongoose.model("users", UserSchema);
export const TodoModel = mongoose.model("todos", TodoSchema);
