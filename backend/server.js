// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Importa cors
import transactionsRoutes from "./routes/transactionsRoutes.js";
// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// Configuración de dotenv
dotenv.config();
const port = process.env.PORT || 5000;

// Conexión a la base de datos
connectDB();

// Inicialización de la app
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes); // Asegúrate de que la ruta esté correcta

// Inicio del servidor
app.listen(port, () => console.log(`Server running on port: ${port}`));
