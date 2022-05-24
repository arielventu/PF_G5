require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bluebird`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring:
const { Product, Review, Stock, Sizes, Colors, Category } = sequelize.models;

// Aca vendrian las relaciones

// -------------------------------------------------------------------------
// Relationship of model ?products'
// 'Product' has many 'Review', 'Review' belong to 'Product'
Product.hasMany(Review, { foreignKey: "productId", sourceKey: "id" });
Review.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' has many 'Stock', 'Stock' belong to 'Product'
Product.hasMany(Stock, { foreignKey: "productId", sourceKey: "id" });
Stock.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' belongs To Many 'Category', 'Category' belong to Many 'Product'
Product.belongsToMany(Category, { through: "productscategories" });
Category.belongsToMany(Product, { through: "productscategories" });

// -------------------------------------------------------------------------
// Relationship of model 'Sizes'
// 'Sizes' has many 'Stock', 'Stock' belong to 'Sizes'
Sizes.hasMany(Stock, { foreignKey: "sizeId", sourceKey: "id" });
Stock.belongsTo(Sizes, { foreignKey: "sizeId", targetId: "id" });

// -------------------------------------------------------------------------
// Relationship of model 'Colors'
// 'Colors' has many 'Stock', 'Stock' belong to 'Colors'
Colors.hasMany(Stock, { foreignKey: "colorId", sourceKey: "id" });
Stock.belongsTo(Colors, { foreignKey: "colorId", targetId: "id" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op
};
