const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller.js");
const {
  validateCreateRole,
  validateUpdateRole,
} = require("../validations/role.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: The created role.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateRole,
  handleValidationErrors,
  roleController.createRole
);

/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Retrieve all roles
 *     description: Retrieve a list of all roles.
 *     responses:
 *       200:
 *         description: A list of all roles.
 *       500:
 *         description: Internal server error.
 */
router.get("/", roleController.getAllRoles);

/**
 * @openapi
 * /roles/{id}:
 *   get:
 *     summary: Retrieve a role by ID
 *     description: Retrieve a single role by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the role to retrieve.
 *     responses:
 *       200:
 *         description: The requested role.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", roleController.getRoleById);

/**
 * @openapi
 * /roles/{id}:
 *   put:
 *     summary: Update a role
 *     description: Update an existing role.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the role to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: The updated role.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateRole,
  handleValidationErrors,
  roleController.updateRole
);

/**
 * @openapi
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     description: Delete an existing role.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the role to delete.
 *     responses:
 *       204:
 *         description: Role deleted successfully.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", roleController.deleteRole);

/**
 * @openapi
 * /roles/{roleId}/users:
 *   get:
 *     summary: Get users with a specific role
 *     description: Retrieve a list of users who have a specific role.
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the role.
 *     responses:
 *       200:
 *         description: A list of users with the specified role.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:roleId/users", roleController.getRoleUsers);

module.exports = router;
