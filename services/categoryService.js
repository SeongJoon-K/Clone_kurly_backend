const categoryDao = require('../models/categoryDao');

const getcategory = async() => {
    const category = await categoryDao.getcategory();
    return category;
}

module.exports = {
    getcategory
}