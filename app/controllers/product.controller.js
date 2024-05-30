const { Product, User, List, Expense } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new product
exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting data from the request body
    const {
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url
    } = req.body;

    // Creating a new product
    const newProduct = await Product.create({
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    // Extracting data from the request body
    const { id } = req.params;
    const {
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url
    } = req.body;

    // Finding the product by its ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Updating the product
    await product.update({
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};