const { Sizes } = require('../db');

const getSizes = async (req, res) => {
    const sizes = Sizes.findAll();
    res.json(sizes);
};

const postSizes = async (req, res) => {
    const {name} = req.body;
    try {
        const sizeCreated = await Sizes.create({name: name});
        res.json(sizeCreated);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSizes,
    postSizes
}

