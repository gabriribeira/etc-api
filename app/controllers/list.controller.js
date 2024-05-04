const { List, Item, User } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.findAll();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single list by ID
exports.getListById = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new list
exports.createList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting data from the request body
    const {
      name,
      description,
      user_id,
      household_id,
      user_id_closed,
      is_closed,
      is_finished,
    } = req.body;

    // Creating a new list
    const newList = await List.create({
      name,
      description,
      user_id,
      household_id,
      user_id_closed,
      is_closed,
      is_finished,
    });
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing list
exports.updateList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    // Extracting data from the request body
    const { id } = req.params;
    const {
      name,
      description,
      user_id,
      household_id,
      user_id_closed,
      is_closed,
      is_finished,
    } = req.body;

    // Finding the list by its ID
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    // Updating the list
    await list.update({
      name,
      description,
      user_id,
      household_id,
      user_id_closed,
      is_closed,
      is_finished,
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a list
exports.deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    await list.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all items in a list
exports.getListItems = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findByPk(listId, { include: Item });
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    const items = list.Items;
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users who have access to a list
exports.getListUsers = async (req, res) => {
  const { listId } = req.params;
  try {
    const list = await List.findByPk(listId, { include: User });
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    const users = list.Users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
