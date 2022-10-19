const { Category } = require("../model/Category");

const getAllCategory = async (req, res) => {
  const categoryList = await Category.find();
  if(!categoryList) return res.status(500).json({ message: "No category found." });
  res.status(200).send(categoryList);
}

const createCategory = async (req, res) => {
  const body = req.body;
  if(!body) return res.status(500).json({ success: false });
  const newCategory = new Category({ ...body });
  newCategory.save()
    .then((createdCategory) => {
      if(!createdCategory) return res.status(404).json({ success: false });
      res.status(200).send(createdCategory);
    })
    .catch((error) => {
      res.status(500).json({ success:false, error: error });
    })
}

module.exports = { createCategory, getAllCategory };