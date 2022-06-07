/* --------------------------------------------
  model: favorites
  create by: evillalba510@gmail.com
  github: evillalba510
  dateTime: 2022-06-06 21:45:00
-----------------------------------------------*/

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "favorites",
    {
      user: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
