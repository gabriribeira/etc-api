const express = require("express");
const router = express.Router();
const specificationController = require("../controllers/specification.controller.js");
const {
  validateCreateSpecification,
  validateUpdateSpecification,
} = require("../validations/specification.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /specifications:
 *   post:
 *     summary: Create a new specification
 *     description: Create a new specification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specification'
 *     responses:
 *       201:
 *         description: The created specification.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateSpecification,
  handleValidationErrors,
  specificationController.createSpecification
);

/**
 * @openapi
 * /specifications:
 *   get:
 *     summary: Retrieve all specifications
 *     description: Retrieve a list of all specifications.
 *     responses:
 *       200:
 *         description: A list of all specifications.
 *       500:
 *         description: Internal server error.
 */
router.get("/", specificationController.getAllSpecifications);

/**
 * @openapi
 * /specifications/{id}:
 *   get:
 *     summary: Retrieve a specification by ID
 *     description: Retrieve a single specification by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the specification to retrieve.
 *     responses:
 *       200:
 *         description: The requested specification.
 *       404:
 *         description: Specification not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", specificationController.getSpecificationById);

/**
 * @openapi
 * /specifications/{id}:
 *   put:
 *     summary: Update a specification
 *     description: Update an existing specification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the specification to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specification'
 *     responses:
 *       200:
 *         description: The updated specification.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Specification not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateSpecification,
  handleValidationErrors,
  specificationController.updateSpecification
);

/**
 * @openapi
 * /specifications/{id}:
 *   delete:
 *     summary: Delete a specification
 *     description: Delete an existing specification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the specification to delete.
 *     responses:
 *       204:
 *         description: Specification deleted successfully.
 *       404:
 *         description: Specification not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", specificationController.deleteSpecification);

/**
 * @openapi
 * /specifications/{specificationId}/users:
 *   get:
 *     summary: Get users who have specified a specification
 *     description: Retrieve a list of users who have specified a specific specification.
 *     parameters:
 *       - in: path
 *         name: specificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the specification.
 *     responses:
 *       200:
 *         description: A list of users who have specified the specification.
 *       404:
 *         description: Specification not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:specificationId/users",
  specificationController.getSpecificationUsers
);

/**
 * @openapi
 * /specifications/{specificationId}/items:
 *   get:
 *     summary: Get items associated with a specification
 *     description: Retrieve a list of items associated with a specific specification.
 *     parameters:
 *       - in: path
 *         name: specificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the specification.
 *     responses:
 *       200:
 *         description: A list of items associated with the specification.
 *       404:
 *         description: Specification not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:specificationId/items",
  specificationController.getSpecificationItems
);

module.exports = router;
