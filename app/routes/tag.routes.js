const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller.js");
const {
  validateCreateTag,
  validateUpdateTag,
} = require("../validations/tag.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     description: Create a new tag.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: The created tag.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateTag,
  handleValidationErrors,
  tagController.createTag
);

/**
 * @openapi
 * /tags:
 *   get:
 *     summary: Retrieve all tags
 *     description: Retrieve a list of all tags.
 *     responses:
 *       200:
 *         description: A list of all tags.
 *       500:
 *         description: Internal server error.
 */
router.get("/", tagController.getAllTags);

/**
 * @openapi
 * /tags/{id}:
 *   get:
 *     summary: Retrieve a tag by ID
 *     description: Retrieve a single tag by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to retrieve.
 *     responses:
 *       200:
 *         description: The requested tag.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", tagController.getTagById);

/**
 * @openapi
 * /tags/{id}:
 *   put:
 *     summary: Update a tag
 *     description: Update an existing tag.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: The updated tag.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateTag,
  handleValidationErrors,
  tagController.updateTag
);

/**
 * @openapi
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag
 *     description: Delete an existing tag.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to delete.
 *     responses:
 *       204:
 *         description: Tag deleted successfully.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", tagController.deleteTag);

/**
 * @openapi
 * /tags/{tagId}/goals:
 *   get:
 *     summary: Get goals associated with a tag
 *     description: Retrieve a list of goals associated with a specific tag.
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag.
 *     responses:
 *       200:
 *         description: A list of goals associated with the tag.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:tagId/goals", tagController.getTagGoals);

/**
 * @openapi
 * /tags/{tagId}/households:
 *   get:
 *     summary: Get households associated with a tag
 *     description: Retrieve a list of households associated with a specific tag.
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag.
 *     responses:
 *       200:
 *         description: A list of households associated with the tag.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:tagId/households", tagController.getTagHouseholds);

module.exports = router;
