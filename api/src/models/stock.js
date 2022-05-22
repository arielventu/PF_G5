/* --------------------------------------------
  file: stock.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

const { DataTypes } = require("sequelize");

/*
attributes model stock

id = identificador único de stock
quantity = cantidad en stock
cost = precio de compra
price = precio de venta
available = disponibilidad (boolean)
*/

module.exports = (sequelize) => {
  sequelize.define(
    "stock",
    {
      quantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: { min: 0 },
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
