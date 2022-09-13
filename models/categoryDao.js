const db = require('../db');

  const getcategory = async(id) => {
    const category = await myDataSource.query(
        `SELECT * FROM categories;`)
        return category
  }
  const detailcategory = async(id) => {
    const category = await myDataSource.query(
        `SELECT name FROM categories WHERE id=${id}`)
        return category
  }


  module.exports = {
    getcategory,
    detailcategory
  }