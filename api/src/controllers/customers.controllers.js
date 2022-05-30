/* --------------------------------------------
  file: Custommers.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  date: 30-05-2022  
-----------------------------------------------*/

const { Customers, Op } = require("../db.js");

const getCustomers = async (req, res) => {
  const keyword = req.query.search;
  let customers = [];
  try {
    if (keyword) {
      customers = await Customers.findAll({
        where: { fullName: { [Op.like]: `%${keyword}%`.toLowerCase() } },
      });
    } else {
      customers = await Customers.findAll();
    }
    res.json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customers.findByPk(id);

    if (!customer)
      return res.status(404).json({ message: "Product does not exists" });

    res.json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
  const {
    nickName,
    email,
    password,
    billingAddress,
    defaultShippingAddress,
    country,
    phone,
    userType,
    status,
  } = req.body;

  try {
    const newCustomer = await Customers.create({
      nickName,
      email,
      password,
      billingAddress,
      defaultShippingAddress,
      country,
      phone,
      userType,
      status,
    });

    res.json(newCustomer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customers.findByPk(id);
    customer.set(req.body);
    await customer.save();
    res.json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customers.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
