import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import alumnosRoutes from "./routes/alumnos.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/alumnos", alumnosRoutes);
app.use("/profesores", profesoresRoutes);

export default app;
