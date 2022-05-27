import { Router } from "express";
import {
  getProfesores,
  createProfesor,
  updateProfesor,
  getProfesor,
  deleteProfesor,
} from "../controllers/profesores.controller.js";

const router = Router();

// Routes
router.post("/", createProfesor);
router.get("/", getProfesores);
router.put("/:id", updateProfesor);
router.delete("/:id", deleteProfesor);
router.get("/:id", getProfesor);

export default router;