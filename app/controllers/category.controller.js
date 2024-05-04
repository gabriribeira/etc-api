const { Category, User, Item } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(jsend.success(categories));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single category by ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(jsend.success(category));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new category
exports.createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { name, details } = req.body;
    const newCategory = await Category.create({ name, details });
    res.status(201).json(jsend.success(newCategory));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, details } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json(jsend.error("Category not found"));
    }
    await category.update({ name, details });
    res.status(200).json(jsend.success(category));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(200).json(jsend.success());
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all items associated with a category
exports.getCategoryItems = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const items = await Item.findAll({
      where: { category_id: categoryId },
    });
    res.status(200).json(jsend.success(items));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
