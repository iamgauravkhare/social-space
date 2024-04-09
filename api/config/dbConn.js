import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("Database connection established successfully! 😉");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
