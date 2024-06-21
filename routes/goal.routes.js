const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller.js");
const {
  validateCreateGoal,
  validateUpdateGoal,
} = require("../validations/goal.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /goals:
 *   get:
 *     summary: Retrieve all goals
 *     description: Retrieve a list of all goals.
 *     responses:
 *       200:
 *         description: A list of all goals.
 *       500:
 *         description: Internal server error.
 */
router.get("/", goalController.getAllGoals);

/**
 * @openapi
 * /households/as:
 * post:
 * summary: Assign a goal to a household
 * description: Assign a goal to a household.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/AssignGoal'
 *  responses:
 * 201:
 * description: The assigned goal.
 * 400:
 * description: Invalid request body.
 * 404:
 * description: Household not found.
 * 500:
 *  description: Internal server error.
 */
router.post('/assign', goalController.assignGoalsToHousehold);

/**
 * @openapi
 * /goals/increment:
 * post:
 * summary: Increment goal progress
 * description: Increment the progress of a goal.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/IncrementGoal'
 * responses:
 * 200:
 * description: The updated goal.
 * 400:
 * description: Invalid request body.
 * 404:
 * description: Goal not found.
 * 500:
 * description: Internal server error.
 */
router.post('/increment', goalController.incrementGoalProgress);

/**
 * 
 * @openapi
 * /goals/by-tags:
 * post:
 * summary: Retrieve goals by tags
 * description: Retrieve a list of goals by tags.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Tags'
 *  responses:
 * 200:
 * description: A list of goals by tags.
 * 400:
 * description: Invalid request body.
 * 500:
 * description: Internal server error.
 */
router.post('/by-tags', goalController.getGoalsByTags);

/**
 * @openapi
 * /goals/household/{householdId}:
 *  get:
 *   summary: Retrieve goals by household
 *  description: Retrieve a list of goals by household.
 * parameters:
 * - in: path
 * name: householdId
 * required: true
 * schema:
 * type: string
 * description: ID of the household.
 * responses:
 * 200:
 * description: A list of goals by household.
 * 404:
 * description: Household not found.
 * 500:
 * description: Internal server error.
 */
router.get('/household/:householdId', goalController.getActiveHouseholdGoals);

/**
 * @openapi
 * /goals/household/{householdId}/completed-goals:
 * get:
 * summary: Retrieve completed goals by household
 * description: Retrieve a list of completed goals by household.
 * parameters:
 * - in: path
 * name: householdId
 * required: true
 * schema:
 * type: string
 * description: ID of the household.
 * responses:
 * 200:
 * description: A list of completed goals by household.
 * 404:
 * description: Household not found.
 *  
 * 500:
 * description: Internal server error.
 */
router.get('/:householdId/completed-goals', goalController.getCompletedHouseholdGoals);

/**
 * @openapi
 * /goals/householdGoalProgress/{householdGoalId}:
 * get:
 * summary: Retrieve goal progress
 * description: Retrieve the progress of a goal.
 * parameters:
 * - in: path
 * name: householdGoalId
 * required: true
 * schema:
 * type: string
 * description: ID of the household goal.
 * responses:
 * 200:
 * description: The goal progress.
 * 404:
 * description: Goal not found.
 * 500:
 * description: Internal server error.
 */
router.get('/:householdGoalId/progress', goalController.getHouseholdGoalProgress);

/**
 * @openapi
 * /goals/{id}:
 *   get:
 *     summary: Retrieve a goal by ID
 *     description: Retrieve a single goal by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal to retrieve.
 *     responses:
 *       200:
 *         description: The requested goal.
 *       404:
 *         description: Goal not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", goalController.getGoalById);

/**
 * @openapi
 * /goals:
 *   post:
 *     summary: Create a new goal
 *     description: Create a new goal record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: The created goal.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateGoal,
  handleValidationErrors,
  goalController.createGoal
);

/**
 * @openapi
 * /goals/{id}:
 *   put:
 *     summary: Update an existing goal
 *     description: Update an existing goal record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: The updated goal.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Goal not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateGoal,
  handleValidationErrors,
  goalController.updateGoal
);

/**
 * @openapi
 * /goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     description: Delete an existing goal record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal to delete.
 *     responses:
 *       204:
 *         description: Goal deleted successfully.
 *       404:
 *         description: Goal not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", goalController.deleteGoal);

/**
 * @openapi
 * /goals/{goalId}/users:
 *   get:
 *     summary: Get users working on a goal
 *     description: Retrieve a list of users who are working on a specific goal.
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the goal.
 *     responses:
 *       200:
 *         description: A list of users working on the goal.
 *       404:
 *         description: Goal not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:goalId/users", goalController.getGoalUsers);

module.exports = router;
