/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 20-05-2022  
-----------------------------------------------*/

const { Product, Review, Stock, Category, Sizes, Colors, Op } = require("../db.js");

const queryAndLikeBuilder = (keys, col) => {
  let res = [];
  keys.forEach( key => {
    let cond = {
      [col]: {
        [Op.iLike]: key
      }
    }
    res.push(cond)
  })
  console.log(res)
  return res
}

const getProducts = async (req, res) => {
  try {
    if (!!req.query.search) {
      let searchKeys = req.query.search.toLowerCase().split(' ').map( key => `%${key}%`)
      const foundProds = await Product.findAll({
        where: {
          [Op.or]: [
            {[Op.and]: queryAndLikeBuilder(searchKeys, 'name')}, 
            {[Op.and]: queryAndLikeBuilder(searchKeys, 'masterName')}
          ] 
        }  
      })
      res.json(foundProds)
    }
    else {
      const products = await Product.findAll({
        include: [
          { model: Category, attributes: ["name"] },
          {
            model: Stock,
            attributes: ["quantity", "available"],
            include: [
              { model: Sizes, attributes: ["size"] },
              { model: Colors, attributes: ["color"] },
            ],
          },

          { model: Review, attributes: ["description", "starsLevel"] },
        ],
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
      include: [
        { model: Category, attributes: ["name"] },

        {
          model: Stock,
          attributes: ["quantity", "available"],
          include: [
            { model: Sizes, attributes: ["size"] },
            { model: Colors, attributes: ["color"] },
          ],
        },

        { model: Review, attributes: ["description", "starsLevel"] },
      ],
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
    });

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

const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.findAll({ where: { productId: id } });
    res.json(reviews);
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
  getProductReviews,
};
