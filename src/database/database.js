import Sequelize from 'sequelize'

export const sequelize =
  new Sequelize('personal', 'admin', 'awsacademy', {
    host: 'rest-db-rds.cygl0esxctiy.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
  });