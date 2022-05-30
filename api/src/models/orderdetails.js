const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderdetails', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  },
  { timestamps: false }
  );
};