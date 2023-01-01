const favoriteDao = require('../models/favoriteDao');

const getfavorite = async() => {
    const favorite = await favoriteDao.getfavorite(product_id);
    return favorite;
}

module.exports = {
    getfavorite
}