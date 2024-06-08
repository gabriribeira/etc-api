const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller.js");
const {
  validateCreateItem,
  validateUpdateItem,
} = require("../validations/item.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Create a new item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The created item.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateItem,
  handleValidationErrors,
  itemController.createItem
);

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Retrieve all items
 *     description: Retrieve a list of all items.
 *     responses:
 *       200:
 *         description: A list of all items.
 *       500:
 *         description: Internal server error.
 */
router.get("/", itemController.getAllItems);

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Retrieve an item by ID
 *     description: Retrieve a single item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to retrieve.
 *     responses:
 *       200:
 *         description: The requested item.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", itemController.getItemById);

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     description: Update an existing item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The updated item.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateItem,
  handleValidationErrors,
  itemController.updateItem
);

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     description: Delete an existing item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item to delete.
 *     responses:
 *       204:
 *         description: Item deleted successfully.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", itemController.deleteItem);

/**
 * @openapi
 * /items/{itemId}/users:
 *   get:
 *     summary: Get users who have added an item
 *     description: Retrieve a list of users who have added a specific item.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item.
 *     responses:
 *       200:
 *         description: A list of users who have added the item.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:itemId/users", itemController.getItemUsers);

/**
 * @openapi
 * /items/{itemId}/expenses:
 *   get:
 *     summary: Get expenses associated with an item
 *     description: Retrieve a list of expenses associated with a specific item.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item.
 *     responses:
 *       200:
 *         description: A list of expenses associated with the item.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:itemId/expenses", itemController.getItemExpenses);

/**
 * @openapi
 * /items/{itemId}/lists:
 *   get:
 *     summary: Get lists containing an item
 *     description: Retrieve a list of lists containing a specific item.
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the item.
 *     responses:
 *       200:
 *         description: A list of lists containing the item.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:itemId/lists", itemController.getItemLists);

module.exports = router;
