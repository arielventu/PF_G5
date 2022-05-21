var express = require('express');
var router = express.Router();

//import controllers
const {
    getCategories,
    postCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/categories.controllers');

// get all categories
router.get('/categories', getCategories);

// post a new category
router.post('/categories', postCategories);

// updates an existant category
router.put('/categories', updateCategory)

// delete a category
router.delete('/categories/:id', deleteCategory)

module.exports = router;