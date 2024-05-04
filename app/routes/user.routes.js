const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../validations/user.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");
const verifyToken = require('../middlewares/auth');

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the user.
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *          type: string
 *         description: Username of the user.
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *          type: string
 *         description: Email of the user.
 *       - in: path
 *         name: img_url
 *         required: false
 *         schema:
 *          type: string
 *         description: Image URL of the user.
 *       - in: path
 *         name: description
 *         required: false
 *         schema:
 *          type: string
 *         description: Description of the user.
 *     responses:
 *       201:
 *         description: The created user.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateUser,
  handleValidationErrors,
  userController.createUser
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of all users.
 *       500:
 *         description: Internal server error.
 */
router.get("/", verifyToken, userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Retrieve a single user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The requested user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", userController.getUserById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: string
 *         description: ID of the user to update.
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the user.
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *          type: string
 *         description: Username of the user.
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *          type: string
 *         description: Email of the user.
 *       - in: path
 *         name: img_url
 *         required: false
 *         schema:
 *          type: string
 *         description: Image URL of the user.
 *       - in: path
 *         name: description
 *         required: false
 *         schema:
 *          type: string
 *         description: Description of the user.
 *     responses:
 *       200:
 *         description: The updated user.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", userController.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateUser,
  handleValidationErrors,
  userController.updateUser
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", userController.deleteUser);

/**
 * @openapi
 * /users/{userId}/households:
 *   get:
 *     summary: Get households of a user
 *     description: Retrieve a list of households associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: A list of households associated with the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId/households", userController.getUserHouseholds);

/**
 * @openapi
 * /users/{userId}/items:
 *   get:
 *     summary: Get items associated with a user
 *     description: Retrieve a list of items associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: A list of items associated with the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId/items", userController.getUserItems);

/**
 * @openapi
 * /users/{userId}/expenses:
 *   get:
 *     summary: Get expenses associated with a user
 *     description: Retrieve a list of expenses associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: A list of expenses associated with the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId/expenses", userController.getUserExpenses);

/**
 * @openapi
 * /users/{userId}/specifications:
 *   get:
 *     summary: Get specifications associated with a user
 *     description: Retrieve a list of specifications associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: A list of specifications associated with the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId/specifications", userController.getUserSpecifications);

/**
 * @openapi
 * /users/{userId}/goals:
 *   get:
 *     summary: Get goals associated with a user
 *     description: Retrieve a list of goals associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: A list of goals associated with the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId/goals", userController.getUserGoals);

/**
 * @openapi
 * /users/{userId}/goalRecords:
 *   get:
 *     summary: Get records of achieved goals by a user
 *     description: Retrieve a list of records of achieved goals by a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user.
 *     responses:
 *       200:
 *         description: A list of records of achieved goals by the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId/goalRecords", userController.getUserGoalRecords);

module.exports = router;
