import { Profesores } from "../models/profesores.js";
import {uploadFile} from '../s3.js'
import fs from "fs";
import path from "path";
import util from "util";
const unlinkFIle = util.promisify(fs.unlink);
// const fs = require('fs');
// const util = require('util');
//const unlinkFIle = util.promisify(fs.unlink);

function validateData(profesor){
  let errors = 0;
  errors += (typeof profesor.numeroEmpleado === 'number');
  errors += (typeof profesor.nombres === 'string');
  errors += (typeof profesor.apellidos === 'string');
  errors += (typeof profesor.horasClase === 'number');
  return errors === 4;
}


export async function getProfesores(req, res) {
  try {
    const profesores = await Profesores.findAll({
      atributes: ["id", "nombres", "apellidos", "numeroEmpleado", "horasClase","fotoPerfilUrl"],
    });
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createProfesor(req, res) {
  const {nombres, apellidos, numeroEmpleado, horasClase} = req.body;
  let dataIsValid = validateData({numeroEmpleado, nombres, apellidos, horasClase});
  if (!dataIsValid){
    res.status(400).json({error: 'Invalid Request Format.'});
  } else if (numeroEmpleado && nombres && apellidos && horasClase) {
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
      return res.status(201).json(newProfesor);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(500).json({error: 'There was an error.'});
  }
}

export async function getProfesor(req, res) {
  const { id } = req.params;
  try {
    const profesor = await Profesores.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(profesor);
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
    let dataIsValid = validateData({numeroEmpleado, nombres, apellidos, horasClase});
    if (!dataIsValid){
      res.status(400).json({error: 'Invalid Request Format.'});
    } else {
      const profesor = await Profesores.findByPk(id);
      profesor.nombres = nombres;
      profesor.apellidos = apellidos;
      profesor.numeroEmpleado = numeroEmpleado;
      profesor.horasClase = horasClase;
      await profesor.save();

      res.status(200).json(profesor);
    }
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteProfesor(req, res) {
  const { id } = req.params;
  try {
    const alumnoExist = await Profesores.findOne({
      where: {
        id,
      },
    });
    if (alumnoExist){ 
    await Profesores.destroy({
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
    const profesor = await Profesores.findByPk(id);
    profesor.fotoPerfilUrl = urlprefix + profesor.numeroEmpleado + path.extname(req.file.originalname);
    await profesor.save();
    
    await unlinkFIle(req.file.path);
    return res.status(201).json(profesor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
