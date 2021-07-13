const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:Sequelize.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};