const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('customers', {
    // nickName: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // email: {
    //     type: DataTypes.TEXT,
    //     validate: {
    //         isEmail: true,
    //         allowNull: false,
    //     }
    // },
    // password: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // fullName: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    billingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    defaultShippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM('user', 'admin', 'guest'),
      allowNull: false,
    },
    // status: {
    //   type: DataTypes.ENUM('active', 'inactive'),
    //   allowNull: false,
    // },  
  },
  { timestamps: false }
  );
};