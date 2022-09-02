const categoryDao = require('../models/categoryDao');

const getcategory = async(id) => {
    const category = await categoryDao.getcategory(id);
    return category;
}

module.exports = {
    getcategory
}