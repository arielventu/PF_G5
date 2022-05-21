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
productID = foreingkey modelo product
colorId = foreingkey modelo color
sizeID = foreingkey modelo size
quantity = cantidad en stock
cost = precio de compra
price = precio de venta
available = disponibilidad (boolean)
*/

module.exports = (sequelize) => {
  sequelize.define(
    "stock",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: { min: 0 },
      },
      cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: { min: 0 },
      },
      price: {
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
