const categoryDao = require('../models/categoryDao');

const getcategory = async() => {
    const category = await categoryDao.getcategory();
    return category;
}   

const detailcategory = async(id) => {
    const category = await categoryDao.detailcategory(id);
    return category;
}


module.exports = {
    getcategory,
    detailcategory
}