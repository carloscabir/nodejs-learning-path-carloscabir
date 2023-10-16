import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("db connected");
} catch (err) {
  console.log("Error", err);
}
