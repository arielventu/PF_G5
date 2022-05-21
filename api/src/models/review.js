/* --------------------------------------------
  file: reviewjs
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

const { DataTypes } = require("sequelize");

/*
attributes model review

id = identificador úncio de review
productId = foreingkey del modelo product
description = descripción detallada
starsLevel = nivel de estrellas

*/

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      starsLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
