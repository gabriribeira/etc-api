const { Product, User, List, Expense } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");
const { Op } = require('sequelize');

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(jsend.success(products));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

exports.getProductsBySupermarket = async (req, res) => {
  const { supermarket } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        store: supermarket,
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this supermarket" });
    }

    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error retrieving products by supermarket:", error);
    res.status(500).json({ message: "Error retrieving products by supermarket" });
  }
};

exports.getProductsOrderedByPrice = async (req, res) => {
  const { order } = req.query; // should be 'asc' or 'desc'
  console.log('order:', order)

  try {
    const products = await Product.findAll({
      order: [['value', order.toUpperCase()]],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error retrieving products ordered by price:", error);
    res.status(500).json({ message: "Error retrieving products ordered by price" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        category_id: categoryId,
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error retrieving products by category:", error);
    res.status(500).json({ message: "Error retrieving products by category" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { supermarket, order, categoryIds } = req.query;
    const query = {};

    if (supermarket) {
      query.store = supermarket;
    }
    if (order) {
      query.order = [['value', order]]; // Assuming 'value' is the price field
    }
    if (categoryIds) {
      query.category_id = { [Op.in]: categoryIds.split(',') };
    }

    const products = await Product.findAll({
      where: query,
      order: query.order || [['id', 'ASC']],
    });

    res.status(200).json(jsend.success(products));
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json(jsend.error("Error retrieving products"));
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

// Controller function to get all products by category
exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.findAll({
      where: {
        category_id: categoryId,
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json(jsend.error("No products found for this category"));
    }

    res.status(200).json(jsend.success(products));
  } catch (error) {
    console.error("Error retrieving products by category:", error);
    res.status(500).json(jsend.error("Error retrieving products by category"));
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "No search term provided" });
    }

    // Use Sequelize to find products where the name matches the search term
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`  // Use like for case-insensitive matching in MySQL
        }
      },
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Internal server error" });
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