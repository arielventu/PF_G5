/* --------------------------------------------
  file: orders.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 30-05-2022  
-----------------------------------------------*/

const { Orders, Op } = require("../db.js");

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Orders.findByPk(id);

    if (!orders)
      return res.status(404).json({ message: "Orders does not exists" });

    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  const {
    orderDate,
    amount,
    shippingAddress,
    orderEmail,
    orderStatus,
    customerId,
  } = req.body;

  try {
    const newOrder = await Orders.create({
      orderDate,
      amount,
      shippingAddress,
      orderEmail,
      orderStatus,
      customerId,
    });

    res.json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Orders.findByPk(id);
    orders.set(req.body);
    await orders.save();
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Orders.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
