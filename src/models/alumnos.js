import { DataTypes } from 'sequelize'
import {} from 'sequelize'
import { sequelize } from '../database/database.js'

export const Alumnos = sequelize.define('alumnos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    matricula: {
        type: DataTypes.STRING
    },
    promedio: {
        type: DataTypes.FLOAT
    },
    fotoPerfilUrl: {
        type: DataTypes.STRING
    },
})