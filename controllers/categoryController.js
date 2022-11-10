const categoryService = require("../services/categoryService");

const getcategory = async (req, res) => {
  try {
    const id = req.params;
    if (!id) {
      return res.status(400).json({ message: "CATEGORY_ID ERROR" });
    }
    const category = await categoryService.getcategory();
    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const detailcategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (id === null) {
      return res.status(400).json({ message: "CATEGORY ID IS NULL" });
    }
    const category = await categoryService.detailcategory(id);
    res.status(200).json(category);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getcategory,
  detailcategory,
};
