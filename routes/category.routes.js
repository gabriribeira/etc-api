const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js");
const {
  validateCreateCategory,
  validateUpdateCategory,
} = require("../validations/category.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: name of the category to create.
 *       - in: path
 *         name: details
 *         required: true
 *         description: details of the category to create.
 *     responses:
 *       201:
 *         description: The created category.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateCategory,
  handleValidationErrors,
  categoryController.createCategory
);

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of all categories.
 *       500:
 *         description: Internal server error.
 */
router.get("/", categoryController.getAllCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     description: Retrieve a single category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: The requested category.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update an existing category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the categories to update.
 *       - in: path
 *         name: name
 *         required: true
 *         description: name of the category to create.
 *       - in: path
 *         name: details
 *         required: true
 *         description: details of the category to create.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: The updated category.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateCategory,
  handleValidationErrors,
  categoryController.updateCategory
);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete an existing category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete.
 *     responses:
 *       204:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", categoryController.deleteCategory);

/**
 * @openapi
 * /categories/{categoryId}/items:
 *   get:
 *     summary: Get items associated with a category
 *     description: Retrieve a list of items associated with a specific category.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category.
 *     responses:
 *       200:
 *         description: A list of items associated with the category.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:categoryId/items", categoryController.getCategoryItems);

module.exports = router;
