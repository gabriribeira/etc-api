const { GoalRecord, Tag, User, Goal } = require('../models');
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to create a new goal record
exports.createGoalRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    // Extracting data from the request body
    const { tagId, userId, incrementValue, valueAfterIncrement } = req.body;

    // Creating a new goal record
    const newRecord = await GoalRecord.create({
      tag_id: tagId,
      user_id: userId,
      increment_value: incrementValue,
      value_after_increment: valueAfterIncrement
    });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all goal records
exports.getAllGoalRecords = async (req, res) => {
  try {
    const records = await GoalRecord.findAll();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a specific goal record by ID
exports.getGoalRecordById = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await GoalRecord.findByPk(recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to update a goal record
exports.updateGoalRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting data from the request body
    const { tagId, userId, incrementValue, valueAfterIncrement } = req.body;
    const { recordId } = req.params;

    // Finding the record to update
    const record = await GoalRecord.findByPk(recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Updating the record
    await record.update({
      tag_id: tagId,
      user_id: userId,
      increment_value: incrementValue,
      value_after_increment: valueAfterIncrement
    });

    res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to delete a goal record
exports.deleteGoalRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await GoalRecord.findByPk(recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    await record.destroy();
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};


// Controller function to get all tags associated with a goal record
exports.getRecordTags = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await GoalRecord.findByPk(recordId, { include: Tag });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const tags = record.Tags;
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all users associated with a goal record
exports.getRecordUsers = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await GoalRecord.findByPk(recordId, { include: User });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const users = record.Users;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get all goals associated with a goal record
exports.getRecordGoals = async (req, res) => {
  const { recordId } = req.params;
  try {
    const record = await GoalRecord.findByPk(recordId, { include: Goal });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    const goals = record.Goals;
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
