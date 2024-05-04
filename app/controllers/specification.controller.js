const { Specification, User, Item } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all specifications
exports.getAllSpecifications = async (req, res) => {
  try {
    const specifications = await Specification.findAll();
    res.status(200).json(specifications);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single specification by ID
exports.getSpecificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const specification = await Specification.findByPk(id);
    if (!specification) {
      return res.status(404).json({ error: "Specification not found" });
    }
    res.status(200).json(specification);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new specification
exports.createSpecification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { name, details } = req.body;
    const newSpecification = await Specification.create({ name, details });
    res.status(201).json(newSpecification);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing specification
exports.updateSpecification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, details } = req.body;
    const specification = await Specification.findByPk(id);
    if (!specification) {
      return res.status(404).json({ error: "Specification not found" });
    }
    await specification.update({ name, details });
    res.status(200).json(specification);
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a specification
exports.deleteSpecification = async (req, res) => {
  const { id } = req.params;
  try {
    const specification = await Specification.findByPk(id);
    if (!specification) {
      return res.status(404).json({ error: "Specification not found" });
    }
    await specification.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users who have specified a specification
exports.getSpecificationUsers = async (req, res) => {
  const { specificationId } = req.params;
  try {
    const specification = await Specification.findByPk(specificationId, {
      include: User,
    });
    if (!specification) {
      return res.status(404).json({ error: "Specification not found" });
    }
    const users = specification.Users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all items associated with a specification
exports.getSpecificationItems = async (req, res) => {
  const { specificationId } = req.params;
  try {
    const items = await Item.findAll({
      where: { specification_id: specificationId },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
