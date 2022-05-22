const { Colors } = require("../db");

const getColors = async (req, res) => {
  try {
    const colors = await Colors.findAll();
    res.json(colors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postColors = async (req, res) => {
  const { name } = req.body;
  try {
    const colorCreated = await Colors.create({ name: name });
    res.json(colorCreated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getColors,
  postColors,
};
