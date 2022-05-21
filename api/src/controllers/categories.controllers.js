const { Category } = require('../db');

// GET ALL
const getCategories = async (req, res) => {
    const categories = Category.findAll();
    res.json(categories);
};

// POST NEW
const postCategories = async (req, res) => {
    const {name} = req.body;
    console.log(name);
    try {
        const categoryCreated = await Category.create({name: name});
        res.json(categoryCreated);
    } catch (error) {
        console.log(error);
    }
}

// UPDATE EXISTENT
const updateCategory = async (req, res) => {
    const {id, name} = req.body;
    console.log(name);
    try {
        const categoryUpdated = await Category.update({
            values: { name: name },
            where: { id: id }
        })
        res.json(categoryUpdated);
    } catch (error) {
        console.log(error);
    }
}

// DELETE EXISTENT
const deleteCategory = async (req, res) => {
    const {categoryID} = req.params.id;
    console.log(categoryID);
    try {
        const categoryDeleted = await Category.destroy({
            where: { id: categoryID }
        })
        res.json(categoryDeleted);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategories,
    postCategories,
    updateCategory,
    deleteCategory
}
