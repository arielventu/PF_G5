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
    colors,
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
      colors,
      available,
    });

    if (req.body.newCategory) {
      const newCat = await Category.create({ name: req.body.newCategory })
      const findNewCategory = await Category.findAll({attributes: ['id'], where: {name: req.body.newCategory}})
      console.log(findNewCategory[0].dataValues.id);
      const categoryToObj = findNewCategory[0].dataValues.id;
      req.body.categories.push(categoryToObj);
    }

    //mejorar est
    // console.log(categoryToObj);
    // await newProduct.setCategories(findNewCategory);



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
    let {categories, newCategory, ...newbody } = req.body;
    let product = await Product.findByPk(newbody.id);
    // console.log(req.body, "back body edit");

    newbody.colors = product.colors;
    // console.log(newbody, "back newbody to edit");
    product.set(newbody);
    product = await product.save();
    console.log(product, "back prodcut edited1");
    console.log(categories, "back prodcut edited2");
    console.log(newCategory, "back prodcut edited3");
    // await product.update({
    //   name: name,
    //   masterName: masterName,
    //   fullName: fullName,
    //   gender: gender,
    //   detail: detail,
    //   price: price,
    //   imagecover: imagecover ,
    //   imageurl: imageurl,
    //   available: available,
    // },
    // {
    //   where: { id: id },
    // }
    // )

    if (newCategory) {
      const newCat = await Category.create({ name: newCategory })
      const findNewCategory = await Category.findAll({attributes: ['id'], where: {name: newCategory}})
      console.log(findNewCategory);
      const categoryToObj = findNewCategory[0].dataValues.id;
      categories.push(categoryToObj);
    }


    // // las categorias asociadas deben venir en forma de array de números. Los números son los ID de categoria para asociar
    // // en cada caso.
    if (categories) {
      await product.setCategories(categories);
    }


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

const updateProductavailable = async (req, res) => {
  try {
    let {id, available } = req.body;
    let product = await Product.findByPk(id);

    await product.update({
      available: available,
    },
    {
      where: { available: !available },
    }
    )

    res.json(product);
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
  updateProductavailable,
};
