/* --------------------------------------------
  model: basketList
  create by: evillalba510@gmail.com
  github: evillalba510
  dateTime: 2022-06-06 21:45:00
-----------------------------------------------*/

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "basketList",
    {
      user: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: { min: 0 },
      },
    },
    { timestamps: false }
  );
};
