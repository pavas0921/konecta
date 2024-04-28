import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login = async (req, res, next) => {
  const { email, contrase_a } = req.body;

  try {
    const user = await prisma.usuarios.findFirst({
      where: {
        email: email,
      },
    });

    const isValidUser = bcrypt.compareSync(contrase_a, user.contrase_a);
    if (isValidUser) {
      req.body.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ error: true, message: "User or password incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
