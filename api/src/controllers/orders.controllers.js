/* --------------------------------------------
  file: orders.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 30-05-2022  
-----------------------------------------------*/

const { Orders, Orderdetails, Customers, Product } = require("../db.js");

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      attributes: { exclude: ["customerId"] },
      include: [
        {
          model: Customers,
          attributes: ["id", "fullName", "country", "phone"],
        },
        {
          model: Orderdetails,
          attributes: { exclude: ["ordersId", "productId"] },
          include: [
            { model: Product, attributes: ["id", "fullName", "imagecover"] },
          ],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Orders.findByPk(id, {
      attributes: { exclude: ["customerId"] },
      include: [
        {
          model: Customers,
          attributes: ["id", "fullName", "country", "phone"],
        },
        {
          model: Orderdetails,
          attributes: { exclude: ["ordersId", "productId"] },
          include: [
            { model: Product, attributes: ["id", "fullName", "imagecover"] },
          ],
        },
      ],
    });

    if (!orders)
      return res.status(404).json({ message: "Orders does not exists" });

    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderByCustomerId = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Orders.findAll({
      where: { customerId: id },
      attributes: { exclude: ["customerId"] },
      include: [
        {
          model: Customers,
          attributes: ["id", "fullName", "country", "phone"],
        },
        {
          model: Orderdetails,
          attributes: { exclude: ["ordersId", "productId"] },
          include: [
            { model: Product, attributes: ["id", "fullName", "imagecover"] },
          ],
        },
      ],
    });

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
    console.log(orders);
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
  getOrderByCustomerId,
  createOrder,
  updateOrder,
  deleteOrder,
};
