/* --------------------------------------------
  file: favorites.controllers.js
  create by: evillalba510@gmail.com
  github: evillalba510
  dateTime: 2022-06-06 22:00:00
-----------------------------------------------*/

const { Favorites } = require("../db.js");

const getFavoritesByUser = async (req, res) => {
  const { user } = req.params;
  try {
    const favorites = await Favorites.findAll({
      where: { user: user },
    });

    if (!favorites)
      return res
        .status(404)
        .json({ message: "Stock does not exists by this productId" });

    res.json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postFavorite = async (req, res) => {
  const { user, productId } = req.body;
  try {
    const favorites = await Favorites.create({
      user,
      productId,
    });

    res.json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const favorites = await Favorites.findByPk(id);
    favorites.set(req.body);
    await favorites.save();

    res.json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorites.destroy({ where: { id } });

    // return message "No content"
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavoritesByUser,
  postFavorite,
  putFavorite,
  deleteFavorite,
};
