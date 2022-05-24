/* --------------------------------------------
  file: products.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 21-05-2022  
-----------------------------------------------*/

const { Stock, Colors, Sizes } = require("../db.js");

const getAllStock = async (req, res) => {
  try {
    const allStock = await Stock.findAll({
      attributes: ["id", "quantity", "available"],
      include: [
        { model: Sizes, attributes: ["name"] },
        { model: Colors, attributes: ["name"] },
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
        { model: Sizes, attributes: ["name"] },
        { model: Colors, attributes: ["name"] },
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
  getAllStock,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
