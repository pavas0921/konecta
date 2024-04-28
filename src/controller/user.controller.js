import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { passwordValitdation } from "../helpers/validatePassword.js";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { nombre, email, contrase_a, rol_id } = req.body;
    if (!passwordValitdation(contrase_a)) {
      const error = "La contraseña no coumple con los requisitos de seguridad";
      res.status(400).json({
        httpStatus: 400,
        message: error,
      });
    } else {
      const hash = bcrypt.hashSync(contrase_a, 12);
      const user = await prisma.usuarios.create({
        data: { nombre, email, contrase_a: hash, rol_id },
      });
      res.status(201).json({
        httpStatus: 201,
        message: "Usuario registrado con éxito",
        content: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      httpStatus: 500,
      message: "Ocurrió un error al ingresar el usuario",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    if (user.length >= 1) {
      res.status(200).json(user);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userid: +id,
      },
    });
    if (user && Object.keys(user).length > 0) {
      res.status(200).json(user);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    if (passwordValitdation(password)) {
      const { id } = req.params;
      const hash = bcrypt.hashSync(password, 12);
      const user = await prisma.user.update({
        where: {
          userid: +id,
        },
        data: { email, password: hash, first_name, last_name },
      });
      res.json(user);
    } else {
      const error =
        "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const deleteUser = async (req, res) => {
  console.log("hola");
  try {
    const { id } = req.params;
    const deleted = await prisma.user.delete({
      where: {
        userid: +id,
      },
    });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
