const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orders', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    orderEmail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    orderDate: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.ENUM('created', 'in_progress', 'cancelled', 'completed'),
        allowNull: false,
    },
  },
  { timestamps: false }
  );
};

