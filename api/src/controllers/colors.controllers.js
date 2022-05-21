const { Colors } = require('../db');

const getColors = async (req, res) => {
    const colors = Colors.findAll();
    res.json(colors);
};

const postColors = async (req, res) => {
    const {name} = req.body;
    console.log(name);
    try {
        const colorCreated = await Colors.create({name: name});
        res.json(colorCreated);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getColors,
    postColors
}
