import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import loginRoutes from "./routes/login.routes.js";
import employeesRoutes from "./routes/empleados.routes.js";
import requestRoutes from "./routes/request.routes.js";

const app = express();
app.use(cors());

//Middleware
app.use(express.json());
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/employees", employeesRoutes);
app.use("/request", requestRoutes);

export default app;
