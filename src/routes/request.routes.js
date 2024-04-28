import express from "express";
import {
  getAllRequest,
  createRequest,
  deleteRequest,
} from "../controller/request.controller.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router();

//login
router.get("/", verifyToken, getAllRequest);
router.post("/", verifyToken, createRequest);
router.delete("/:id", verifyToken, deleteRequest);

export default router;
