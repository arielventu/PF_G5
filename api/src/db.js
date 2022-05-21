require("dotenv").config();
const { Sequelize } = require("sequelize");
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
const { Product, Review, Stock, Sizes, Colors, Material, Category } = sequelize.models;

// Aca vendrian las relaciones

// Relationship of model products
// 'Product' has many 'Review', 'Review' belong to 'Product'
Product.hasMany(Review, { foreignKey: "productId", sourceKey: "id" });
<<<<<<< HEAD
Review.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' has many 'Stock', 'Stock' belong to 'Product'
=======
Review.belongsTo(Product, { foreignKey: "productId", targerId: "id" });
// 'Product' has many 'Stock', 'Stock' belong to 'Product'
>>>>>>> eliecer
Product.hasMany(Stock, { foreignKey: "productId", sourceKey: "id" });
Stock.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' has many 'Material', 'Material' belong to 'Product'
Product.hasMany(Material, { foreignKey: "productId", sourceKey: "id" });
Material.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' has many 'Material', 'Material' belong to 'Product'
Product.hasMany(Material, { foreignKey: "productId", sourceKey: "id" });
Material.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' has many 'Colors', 'Colors' belong to 'Product'
Product.hasMany(Colors, { foreignKey: "productId", sourceKey: "id" });
Colors.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' has many 'Sizes', 'Sizes' belong to 'Product'
Product.hasMany(Sizes, { foreignKey: "productId", sourceKey: "id" });
Sizes.belongsTo(Product, { foreignKey: "productId", targetId: "id" });

// Relationship: 'Product' belongsToMany 'Category', 'Category' belongsToMany 'Product'
Product.belongsToMany(Category, { through: "product-category"});
Category.belongsToMany(Product, { through: "product-category"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
