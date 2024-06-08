const { Tag, Goal, Household } = require('../models');
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single tag by ID
exports.getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new tag
exports.createTag = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { title } = req.body;
    const newTag = await Tag.create({ title });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
};

// Controller function to update an existing tag
exports.updateTag = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { id } = req.params;
    const { title } = req.body;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.update({ title });
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a tag
exports.deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all goals associated with a tag
exports.getTagGoals = async (req, res) => {
  const { tagId } = req.params;
  try {
    const tag = await Tag.findByPk(tagId, { include: Goal });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    const goals = tag.Goals;
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

exports.getTagHouseholds = async (req, res) => {
  const { tagId } = req.params;
  try {
    const tag = await Tag.findByPk(tagId, { include: Household });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    const households = tag.Households;
    res.status(200).json(households);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};