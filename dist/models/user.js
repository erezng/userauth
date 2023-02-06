import { model } from "mongoose";
import { userSchema } from "../schemas/useSchema.js";
const User = model("User", userSchema);
export { User };
