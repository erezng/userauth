import { Router } from "express";
import _ from "underscore";
import { validateSignUp } from "../middleware/validateSignUp.js";
import { User } from "../models/user.js";
const router = Router();
router.post("./signup", validateSignUp, async (req, res) => {
  try {
    const body = _.pick(req.body, "username", "email", "password");
    const user = await new User(body).save();
    return res.json({ messege: "user saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ messege: "Server error", error: e });
  }
});
export { router as userRouter };
