import { Alumnos } from "../models/alumnos.js";

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
  const {nombres, apellidos, matricula, promedio, fotoPerfilUrl} = req.body;
  console.log(req.body);
  try {
    let newAlumno = await Alumnos.create(
      {
        nombres:nombres,
        apellidos:apellidos,
        matricula:matricula,
        promedio:promedio,
        fotoPerfilUrl:fotoPerfilUrl
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
    const { nombres, apellidos, matricula, promedio, fotoPerfilUrl } = req.body;

    const alumno = await Alumnos.findByPk(id);
    alumno.nombres = nombres;
    alumno.apellidos = apellidos;
    alumno.matricula = matricula;
    alumno.promedio = promedio;
    alumno.fotoPerfilUrl = fotoPerfilUrl;
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
