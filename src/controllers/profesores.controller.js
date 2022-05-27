import { Profesores } from "../models/profesores.js";
import {uploadFile} from '../s3.js'
import fs from "fs";
import path from "path";
import util from "util";
const unlinkFIle = util.promisify(fs.unlink);
// const fs = require('fs');
// const util = require('util');
//const unlinkFIle = util.promisify(fs.unlink);

export async function getProfesores(req, res) {
  try {
    const profesores = await Profesores.findAll({
      atributes: ["id", "nombres", "apellidos", "numeroEmpleado", "horasClase","fotoPerfilUrl"],
    });
    res.json(profesores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createProfesor(req, res) {
  const {nombres, apellidos, numeroEmpleado, horasClase} = req.body;
  try {
    let newProfesor = await Profesores.create(
      {
        nombres,
        apellidos,
        numeroEmpleado,
        horasClase,
      },
      {
        fields: ["nombres", "apellidos", "numeroEmpleado", "horasClase","fotoPerfilUrl"]
      }
    );
    return res.json(newProfesor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

export async function getProfesor(req, res) {
  const { id } = req.params;
  try {
    const profesor = await Profesores.findOne({
      where: {
        id,
      },
    });
    res.json(profesor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;

    const profesor = await Profesores.findByPk(id);
    profesor.nombres = nombres;
    profesor.apellidos = apellidos;
    profesor.numeroEmpleado = numeroEmpleado;
    profesor.horasClase = horasClase;
    await profesor.save();

    res.json(profesor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteProfesor(req, res) {
  const { id } = req.params;
  try {
    await Profesores.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function uploadPicture(req, res) {
  const urlprefix = "https://a16003152-files.s3.amazonaws.com/"
  const { id } = req.params;
  uploadFile(req.file)
  console.log(req.file)
  try {
    const profesor = await Profesores.findByPk(id);
    profesor.fotoPerfilUrl = urlprefix + profesor.numeroEmpleado + path.extname(req.file.originalname);
    await profesor.save();
    res.json(profesor);
    await unlinkFIle(req.file.path);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
