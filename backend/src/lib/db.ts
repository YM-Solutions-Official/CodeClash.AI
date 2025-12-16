import mongoose from "mongoose";

export default async function connectToDB(MONGO_URI: string) {

  mongoose.connection.on("connecting", () => {
    console.log("Mongoose connecting...");
  });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  await mongoose.connect(MONGO_URI);
}
