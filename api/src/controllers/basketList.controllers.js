/* --------------------------------------------
  file: basketList.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  dateTime: 2022-06-06 22:30:00
-----------------------------------------------*/

const { BasketList } = require("../db.js");

const getBasketListByUser = async (req, res) => {
  const { user } = req.params;
  try {
    const basketList = await BasketList.findAll({
      where: { user: user },
    });

    if (!basketList)
      return res
        .status(404)
        .json({ message: "Stock does not exists by this productId" });

    res.json(basketList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postBasketList = async (req, res) => {
  const { user, quantity, productId } = req.body;
  try {
    const basketList = await BasketList.create({
      user,
      quantity,
      productId,
    });

    res.json(basketList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putBasketList = async (req, res) => {
  try {
    const { id } = req.params;
    const basketList = await BasketList.findByPk(id);
    basketList.set(req.body);
    await basketList.save();

    res.json(basketList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBasketListItem = async (req, res) => {
  try {
    const { id } = req.params;
    await BasketList.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getBasketListByUser,
  postBasketList,
  putBasketList,
  deleteBasketListItem,
};
