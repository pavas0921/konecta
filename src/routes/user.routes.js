import express from "express";
import { createUser } from "../controller/user.controller.js";
const router = express.Router();

// //get all users
// router.get("/", verifyToken, getAllUsers);

// //get user by id
// router.get("/:id", verifyToken, getOneUser);

//Crear user
router.post("/", createUser);

// //Update user
// router.put("/:id", verifyToken, updateUser);

// //Delete user
// router.delete("/:id", verifyToken, deleteUser);

// //login
// router.post("/login", login, generateToken);

// //router.post("/", register);

export default router;
