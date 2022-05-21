const { Sizes } = require("../db");

const getSizes = async (req, res) => {
  try {
    const sizes = await Sizes.findAll();
    res.json(sizes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postSizes = async (req, res) => {
  const { name } = req.body;
  try {
    const sizeCreated = await Sizes.create({ name: name });
    res.json(sizeCreated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSizes,
  postSizes,
};
