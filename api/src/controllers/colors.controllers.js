const { Colors } = require("../db");


const getColors = async (req, res) => {
  try {
    const colors = await Colors.findAll();
    res.json(colors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const getColors = async (req, res) => {
//   try {
//     const colors = await Colors.findAll(
//       {attributes: ["color"]}
//     );
//     const onlyColorsinArray = [];
//     colors.forEach( objColor => onlyColorsinArray.push(objColor.color))
//     res.json(onlyColorsinArray);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const postColors = async (req, res) => {
  const { name } = req.body;
  try {
    const colorCreated = await Colors.create({ "color": name });
    res.json(colorCreated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getColors,
  postColors,
};
