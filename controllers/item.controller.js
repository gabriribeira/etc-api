const { Item, User, List, Expense, Product } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single item by ID
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new item
exports.createItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let img_url;
    if (req.file) {
      img_url = `${process.env.PLATFORM_BACKEND_URL}/uploads/images/${req.file.filename}`;
    }

    // Extracting data from the request body
    const {
      list_id,
      category_id,
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      is_suggestion,
      is_expense,
    } = req.body;

    // Creating a new item
    const newItem = await Item.create({
      list_id,
      category_id,
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url,
      is_suggestion,
      is_expense,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing item
exports.updateItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    let img_urlParam;
    if (req.file) {
      img_urlParam = `${process.env.PLATFORM_BACKEND_URL}/uploads/images/${req.file.filename}`;
    }

    // Extracting data from the request body
    const { id } = req.params;
    const {
      list_id,
      category_id,
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url,
      is_suggestion,
      is_expense,
    } = req.body;

    // Finding the item by its ID
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Updating the item
    await item.update({
      list_id,
      category_id,
      name,
      value,
      amount,
      unit,
      details,
      brand,
      store,
      img_url: img_urlParam || img_url,
      is_suggestion,
      is_expense,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete an item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    await item.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users who have added an item
exports.getItemUsers = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findByPk(itemId, { include: User });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    const users = item.Users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all expenses associated with an item
exports.getItemExpenses = async (req, res) => {
  const { itemId } = req.params;
  try {
    const expenses = await Expense.findAll({ where: { item_id: itemId } });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all lists containing an item
exports.getItemLists = async (req, res) => {
  const { itemId } = req.params;
  try {
    const lists = await List.findAll({ where: { item_id: itemId } });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
