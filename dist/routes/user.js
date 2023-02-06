var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import Joi from "joi";
import _ from "underscore";
import { User } from "../models/user.js";
import { passwordRegex } from "./utils.js";
const router = Router();
router.post("./signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield new User(body).save();
        return res.json({ messege: "user saved", id: user._id });
    }
    catch (e) {
        return res.status(500).json({ messege: "Server error", error: e });
    }
}));
export { router as userRouter };
