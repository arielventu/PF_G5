/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

const {
  Product,
  Review,
  Stock,
  Category,
  Sizes,
  Colors,
  Op,
} = require("../db.js");

const queryAndLikeBuilder = (keys, col) => {
  let res = [];
  keys.forEach((key) => {
    let cond = {
      [col]: {
        [Op.iLike]: key,
      },
    };
    res.push(cond);
  });
  console.log(res);
  return res;
};

const includeArr = [
  { model: Category },
  {
    model: Stock,
    include: [{ model: Sizes }, { model: Colors }],
  },
  { model: Review },
];

const getProducts = async (req, res) => {
  try {
    if (!!req.query.search) {
      let searchKeys = req.query.search
        .toLowerCase()
        .split(" ")
        .map((key) => `%${key}%`);
      const foundProds = await Product.findAll({
        where: {
          [Op.or]: [
            { [Op.and]: queryAndLikeBuilder(searchKeys, "name") },
            { [Op.and]: queryAndLikeBuilder(searchKeys, "masterName") },
          ],
        },
        include: includeArr,
      });
      res.json(foundProds);
    } else {
      const products = await Product.findAll({
        order: [["id", "ASC"]],
        include: includeArr,
      });
      res.json(products);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      order: [["id", "ASC"]],
      include: includeArr,
    });

    if (!product)
      return res.status(404).json({ message: "Product does not exists" });

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const {
    name,
    masterName,
    fullName,
    gender,
    detail,
    price,
    imagecover,
    imageurl,
    available,
  } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      masterName,
      fullName,
      gender,
      detail,
      price,
      imagecover,
      imageurl,
      available,
    });

    // las categorias asociadas deben venir en forma de array de números. Los números son los ID de categoria para asociar
    // en cada caso.
    if (req.body.hasOwnProperty("categories")) {
      await newProduct.setCategories(req.body.categories);
    }

    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    product.set(req.body);
    await product.save();

    // las categorias asociadas deben venir en forma de array de números. Los números son los ID de categoria para asociar
    // en cada caso.
    if (req.body.hasOwnProperty("categories")) {
      await product.setCategories(req.body.categories);
    }

    // RELACIONES DE MUCHOS A MUCHOS
    // products - categories

    // product = setCategories([id-cat,id-cat...])
    // product = getCategories() --> devuelve un [ ids catego ]

    // categories = setPoruducts([id-prod1, id-prod2, ...])
    // categories = getProducts() --> devuelve un [ ids prod ]

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
