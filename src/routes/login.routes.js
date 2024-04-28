import express from "express";
import { login } from "../controller/login.controller.js";
import { generateToken } from "../helpers/generateToken.js";

const router = express.Router();

//login
router.post("/", login, generateToken);

export default router;
