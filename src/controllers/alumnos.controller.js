import { Alumnos } from "../models/alumnos.js";
import {uploadFile} from '../s3.js'
import fs from "fs";
import path from "path";
import util from "util";
const unlinkFIle = util.promisify(fs.unlink);
// const fs = require('fs');
// const util = require('util');
//const unlinkFIle = util.promisify(fs.unlink);

export async function getAlumnos(req, res) {
  try {
    const alumnos = await Alumnos.findAll({
      atributes: ["id", "nombres", "apellidos", "matricula", "promedio","fotoPerfilUrl"],
    });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createAlumno(req, res) {
  const {nombres, apellidos, matricula, promedio} = req.body;
  console.log(req.body);
  try {
    let newAlumno = await Alumnos.create(
      {
        nombres:nombres,
        apellidos:apellidos,
        matricula:matricula,
        promedio:promedio,
      },
      {
        fields: ["nombres", "apellidos", "matricula", "promedio","fotoPerfilUrl"]
      }
    );
    return res.json(newAlumno);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

export async function getAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumno = await Alumnos.findOne({
      where: {
        id,
      },
    });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, matricula, promedio} = req.body;

    const alumno = await Alumnos.findByPk(id);
    alumno.nombres = nombres;
    alumno.apellidos = apellidos;
    alumno.matricula = matricula;
    alumno.promedio = promedio;
    await alumno.save();

    res.json(alumno);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteAlumno(req, res) {
  const { id } = req.params;
  try {
    await Alumnos.destroy({
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
    const alumno = await Alumnos.findByPk(id);
    alumno.fotoPerfilUrl = urlprefix + alumno.matricula + path.extname(req.file.originalname);
    await alumno.save();
    res.json(alumno);
    await unlinkFIle(req.file.path);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}