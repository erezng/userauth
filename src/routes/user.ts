import { Router } from "express";
import Joi from "joi";
import _ from "underscore";
import { User } from "../models/user.js";
import { passwordRegex } from "./utils.js";
const router = Router();
router.post("./signup", async (req, res) => {
  const body = _.pick(req.body, "username", "email", "password");
  const joiUserSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
  });
  const { error } = joiUserSchema.validate(body);
  if (error) {
    return res.status(400).json({
      messege: "validation failed",
      error: error.details.map((ed) => ed.message),
    });
  }
  try {
    const user = await new User(body).save();
    return res.json({ messege: "user saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ messege: "Server error", error: e });
  }
});
export { router as userRouter };
