/* --------------------------------------------
  file: orderDetails.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 30-05-2022  
-----------------------------------------------*/

const { OrderDetails } = require("../db.js");

const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findAll();
    res.json(orderDetails);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderDetails.findByPk(id);

    if (!orderDetail)
      return res.status(404).json({ message: "Order Details does not exists" });

    res.json(orderDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createOrderDetail = async (req, res) => {
  const { price, quantity } = req.body;

  try {
    const newOrder = await Orders.create({
      price,
      quantity,
    });

    res.json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await OrderDetails.findByPk(id);
    orderDetail.set(req.body);
    await orderDetail.save();
    res.json(orderDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderDetails.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrderDetails,
  getOrderDetail,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
