import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEmployees = async (req, res) => {
  console.log("req", req.body);
  try {
    const employees = await prisma.empleados.findMany();
    if (employees.length >= 1) {
      res.status(200).json(employees);
    } else {
      res.status(204).json({ error: true, content: employees });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { fecha_ingreso, nombre, salario, user_rol } = req.body;
    if (user_rol === 1) {
      const employee = await prisma.empleados.create({
        data: { fecha_ingreso: new Date(fecha_ingreso), nombre, salario },
      });
      if (employee) {
        res.status(201).json({
          httpStatus: 201,
          message: "Empleado registrado con éxito",
          content: employee,
        });
      } else {
        res.status(400).json({
          httpStatus: 400,
          message: "Ocurrió un error al registrar el usuario",
          content: employee,
        });
      }
    } else {
      res.status(401).json({
        httpStatus: 401,
        message: "Usted no posee permisos para realizar esta operación",
        content: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      httpStatus: 500,
      message: "Ocurrió un error al registrar el usuario",
    });
  }
};
