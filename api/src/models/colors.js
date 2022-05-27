const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('colors', {
    //   color: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },

    color: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  },
  { timestamps: false }
  );
};