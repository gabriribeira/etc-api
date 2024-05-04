const express = require("express");
const router = express.Router();
const listController = require("../controllers/list.controller.js");
const {
  validateCreateList,
  validateUpdateList,
} = require("../validations/list.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /lists:
 *   post:
 *     summary: Create a new list
 *     description: Create a new list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       201:
 *         description: The created list.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateList,
  handleValidationErrors,
  listController.createList
);

/**
 * @openapi
 * /lists:
 *   get:
 *     summary: Retrieve all lists
 *     description: Retrieve a list of all lists.
 *     responses:
 *       200:
 *         description: A list of all lists.
 *       500:
 *         description: Internal server error.
 */
router.get("/", listController.getAllLists);

/**
 * @openapi
 * /lists/{id}:
 *   get:
 *     summary: Retrieve a list by ID
 *     description: Retrieve a single list by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the list to retrieve.
 *     responses:
 *       200:
 *         description: The requested list.
 *       404:
 *         description: List not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", listController.getListById);

/**
 * @openapi
 * /lists/{id}:
 *   put:
 *     summary: Update a list
 *     description: Update an existing list.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the list to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       200:
 *         description: The updated list.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: List not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateList,
  handleValidationErrors,
  listController.updateList
);

/**
 * @openapi
 * /lists/{id}:
 *   delete:
 *     summary: Delete a list
 *     description: Delete an existing list.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the list to delete.
 *     responses:
 *       204:
 *         description: List deleted successfully.
 *       404:
 *         description: List not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", listController.deleteList);

/**
 * @openapi
 * /lists/{listId}/items:
 *   get:
 *     summary: Get items in a list
 *     description: Retrieve a list of items contained in a specific list.
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the list.
 *     responses:
 *       200:
 *         description: A list of items contained in the list.
 *       404:
 *         description: List not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:listId/items", listController.getListItems);

/**
 * @openapi
 * /lists/{listId}/users:
 *   get:
 *     summary: Get users with access to a list
 *     description: Retrieve a list of users who have access to a specific list.
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the list.
 *     responses:
 *       200:
 *         description: A list of users with access to the list.
 *       404:
 *         description: List not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:listId/users", listController.getListUsers);

module.exports = router;
