import { Alumnos } from "../models/alumnos.js";
import {uploadFile} from '../s3.js'
import fs from "fs";
import path from "path";
import util from "util";
const unlinkFIle = util.promisify(fs.unlink);
// const fs = require('fs');
// const util = require('util');
//const unlinkFIle = util.promisify(fs.unlink);

function validateData(alumno){
  let errors = 0;
  errors += (typeof alumno.nombres === 'string');
  errors += (typeof alumno.apellidos === 'string');
  errors += (typeof alumno.matricula === 'string');
  errors += (typeof alumno.promedio === 'number');
  return errors === 4;
}

export async function getAlumnos(req, res) {
  try {
    const alumnos = await Alumnos.findAll({
      atributes: ["id", "nombres", "apellidos", "matricula", "promedio","fotoPerfilUrl"],
    });
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createAlumno(req, res) {
  const {nombres, apellidos, matricula, promedio} = req.body;
  let dataIsValid = validateData({nombres, apellidos, matricula, promedio} );
  if (!dataIsValid){
    res.status(400).json({error: 'Invalid Request Format.'});
  } else if (nombres && apellidos && matricula && promedio) {
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
      return res.status(201).json(newAlumno);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(500).json({error: 'There was an error.'});
  }
}

export async function getAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumno = await Alumnos.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(alumno);
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
    let dataIsValid = validateData({ nombres, apellidos, matricula, promedio});
    if (!dataIsValid){
      res.status(400).json({error: 'Invalid Request Format.'});
    } else {
      const alumno = await Alumnos.findByPk(id);
      alumno.nombres = nombres;
      alumno.apellidos = apellidos;
      alumno.matricula = matricula;
      alumno.promedio = promedio;
      await alumno.save();

      return res.status(200).json(alumno);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumnoExist = await Alumnos.findOne({
      where: {
        id,
      },
    });
    if (alumnoExist){ await Alumnos.destroy({
      where: {
        id,
      },
    });
    return res.status(200).sendStatus(200);
    } else {
      return res.status(404).sendStatus(404);
    }
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
    
    //await unlinkFIle(req.file.path);
    return res.status(200).json(alumno);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}