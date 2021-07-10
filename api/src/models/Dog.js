const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      allownull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING
    },
    image:{
      type: DataTypes.STRING
    }
  });
};
