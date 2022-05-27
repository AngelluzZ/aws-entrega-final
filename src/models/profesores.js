import { DataTypes } from 'sequelize'
import {} from 'sequelize'
import { sequelize } from '../database/database.js'

export const Profesores = sequelize.define('profesores',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    numeroEmpleado: {
        type: DataTypes.STRING
    },
    nombres: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    horasClase: {
        type: DataTypes.INTEGER
    },
    fotoPerfilUrl: {
        type: DataTypes.STRING
    },
})