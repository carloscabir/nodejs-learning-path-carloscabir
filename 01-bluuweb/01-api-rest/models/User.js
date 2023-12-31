import mongoose, { Model } from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model.create("user", userSchema);
