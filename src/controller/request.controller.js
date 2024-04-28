import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllRequest = async (req, res) => {
  try {
    const { user_rol } = req.body;
    if (user_rol === 1) {
      const request = await prisma.solicitudes.findMany();
      if (request.length >= 1) {
        res.status(200).json({
          httpStatus: 200,
          content: request,
        });
      } else {
        res.status(204).json({
          httpStatus: 204,
          message: "No se encontró ninguna solicitud registrada",
          content: [],
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
      message: "Ocurrio un error al mostrar las solicitudes",
    });
  }
};

export const createRequest = async (req, res) => {
  try {
    const { codigo, descripcion, resumen, id_empleado, user_rol } = req.body;
    if (user_rol === 1) {
      const request = await prisma.solicitudes.create({
        data: { codigo, descripcion, resumen, id_empleado },
      });
      if (request) {
        res.status(201).json({
          httpStatus: 201,
          message: "Solicitud registrada con éxito",
          content: request,
        });
      } else {
        res.status(400).json({
          httpStatus: 400,
          message: "Ocurrió un error al registrar la Solicitud",
          content: request,
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
      message: "Ocurrió un error al registrar la Solicitud",
    });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.solicitudes.delete({
      where: {
        id: +id,
      },
    });
    if (deleted) {
      res.status(200).json({
        httpStatus: 200,
        message: "Solicitud eliminada con éxito",
        content: deleted,
      });
    }
  } catch (error) {
    res.status(500).json({
      httpStatus: 500,
      message: "Ocurrió un error al eliminar la Solicitud",
    });
  }
};
