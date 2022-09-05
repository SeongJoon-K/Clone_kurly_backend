//categoryController.js
const categoryService = require('../services/categoryService');

const getcategory = async(req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message : "CATEGORY_ID ERROR"});
        }
        const category = await categoryService.getcategory(id);
        res.status(201).json( {
            category
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message });
    }
}

module.exports = {
    getcategory
}