const express = require("express");
const router = express.Router();
const goalRecordController = require("../controllers/goalrecord.controller.js");
const {
  validateCreateGoalRecord,
  validateUpdateGoalRecord,
} = require("../validations/goalrecord.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /goalrecords:
 *   post:
 *     summary: Create a new goal record
 *     description: Create a new goal record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoalRecord'
 *     responses:
 *       201:
 *         description: The created goal record.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateGoalRecord,
  handleValidationErrors,
  goalRecordController.createGoalRecord
);

/**
 * @openapi
 * /goalrecords:
 *   get:
 *     summary: Retrieve all goal records
 *     description: Retrieve a list of all goal records.
 *     responses:
 *       200:
 *         description: A list of all goal records.
 *       500:
 *         description: Internal server error.
 */
router.get("/", goalRecordController.getAllGoalRecords);

/**
 * @openapi
 * /goalrecords/{recordId}:
 *   get:
 *     summary: Retrieve a goal record by ID
 *     description: Retrieve a single goal record by its ID.
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal record to retrieve.
 *     responses:
 *       200:
 *         description: The requested goal record.
 *       404:
 *         description: Goal record not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:recordId", goalRecordController.getGoalRecordById);

/**
 * @openapi
 * /goalrecords/{recordId}:
 *   put:
 *     summary: Update a goal record
 *     description: Update an existing goal record.
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal record to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoalRecord'
 *     responses:
 *       200:
 *         description: The updated goal record.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Goal record not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:recordId",
  validateUpdateGoalRecord,
  handleValidationErrors,
  goalRecordController.updateGoalRecord
);

/**
 * @openapi
 * /goalrecords/{recordId}:
 *   delete:
 *     summary: Delete a goal record
 *     description: Delete an existing goal record.
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal record to delete.
 *     responses:
 *       204:
 *         description: Goal record deleted successfully.
 *       404:
 *         description: Goal record not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:recordId", goalRecordController.deleteGoalRecord);

/**
 * @openapi
 * /goalrecords/{recordId}/tags:
 *   get:
 *     summary: Get tags associated with a goal record
 *     description: Retrieve a list of tags associated with a specific goal record.
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal record.
 *     responses:
 *       200:
 *         description: A list of tags associated with the goal record.
 *       404:
 *         description: Goal record not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:recordId/tags", goalRecordController.getRecordTags);

/**
 * @openapi
 * /goalrecords/{recordId}/users:
 *   get:
 *     summary: Get users associated with a goal record
 *     description: Retrieve a list of users associated with a specific goal record.
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal record.
 *     responses:
 *       200:
 *         description: A list of users associated with the goal record.
 *       404:
 *         description: Goal record not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:recordId/users", goalRecordController.getRecordUsers);

/**
 * @openapi
 * /goalrecords/{recordId}/goals:
 *   get:
 *     summary: Get goals associated with a goal record
 *     description: Retrieve a list of goals associated with a specific goal record.
 *     parameters:
 *       - in: path
 *         name: recordId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal record.
 *     responses:
 *       200:
 *         description: A list of goals associated with the goal record.
 *       404:
 *         description: Goal record not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:recordId/goals", goalRecordController.getRecordGoals);

module.exports = router;
