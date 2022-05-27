import { Router } from "express";
import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  getAlumno,
  deleteAlumno,
  uploadPicture,
} from "../controllers/alumnos.controller.js";

const router = Router();

// Routes
router.post("/", createAlumno);
router.get("/", getAlumnos);
router.delete('/', (req, res) => {
  res.status(405).json({error:'Wrong Request: Method Not Allowed'});
});
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);
router.get("/:id", getAlumno);
router.post("/:id/fotoPerfil", uploadPicture);

export default router;
