import { Router } from "express";
import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  getAlumno,
  deleteAlumno,
} from "../controllers/alumnos.controller.js";

const router = Router();

// Routes
router.post("/", createAlumno);
router.get("/", getAlumnos);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);
router.get("/:id", getAlumno);

export default router;
