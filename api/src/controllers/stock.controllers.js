/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 21-05-2022  
-----------------------------------------------*/

const { Stock, Colors, Sizes, Product, Category } = require("../db.js");

//Primer version
// const getStocks = async (req, res) => {
//   try {
//     const allStock = await Stock.findAll({
//       attributes: ["id", "quantity", "available"],
//       include: [
//         { model: Sizes, attributes: ["size"] },
//         { model: Colors, attributes: ["color"] },
//       ],
//     });
//     res.json(allStock);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

//Segunda Version
const getStocks = async (req, res) => {
  try {
    const allStock = await Product.findAll({
      include: [
        { model: Category, attributes: ["name"]},
        { model: Stock, attributes: ["id", "quantity", "available"],
          include: [
<<<<<<< HEAD
            { model: Sizes, attributes: ["id", "size"] },
            { model: Colors, attributes: ["id", "color"] },
=======
            { model: Sizes, attributes: ["id","size"] },
            { model: Colors, attributes: ["id","color"] },
>>>>>>> ee358f9774d6a51b7a6d299134b2b91c75c418c1
          ]
          }
        ],
    });
    res.json(allStock);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStock = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findByPk(id, {
      attributes: ["id", "quantity", "available"],
      include: [
        { model: Sizes, attributes: ["id","size"] },
        { model: Colors, attributes: ["id","color"] },
      ],
    });

    if (!stock)
      return res.status(404).json({ message: "Stock does not exists" });

    res.json(stock);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createStock = async (req, res) => {
  const { quantity, cost, price, available, productId, sizeId, colorId } =
    req.body;
  try {
    const newStock = await Stock.create({
      quantity,
      cost,
      price,
      available,
      productId,
      sizeId,
      colorId,
    });

    res.json(newStock);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByPk(id);
    product.set(req.body);
    await stock.save();

    res.json(stock);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    await Stock.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
