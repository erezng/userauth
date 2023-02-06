import mongoose from "mongoose";
const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/userauth");
  console.log("Succesfully connected to the database userauth");
};
export { connect };
