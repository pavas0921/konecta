import express from "express";
import {
  getAllEmployees,
  createEmployee,
} from "../controller/empleados.controller.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router();

//login
router.get("/", verifyToken, getAllEmployees);
router.post("/", verifyToken, createEmployee);

export default router;
