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
      productID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      colorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sizeID: {
        type: DataTypes.UUID,
        allowNull: false,
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
