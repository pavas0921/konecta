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

    if (user) {
      const isValidUser = bcrypt.compareSync(contrase_a, user.contrase_a);
      if (isValidUser) {
        req.body.user = user;
        next();
      } else {
        res
          .status(401)
          .json({ httpStatus: 401, message: "User or password incorrect" });
      }
    } else {
      res
        .status(401)
        .json({ httpStatus: 401, message: "User or password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
