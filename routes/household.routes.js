const express = require("express");
const router = express.Router();
const householdController = require("../controllers/household.controller.js");
const {
  validateCreateHousehold,
  validateUpdateHousehold,
} = require("../validations/household.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /households:
 *   post:
 *     summary: Create a new household
 *     description: Create a new household.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Household'
 *     responses:
 *       201:
 *         description: The created household.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateHousehold,
  handleValidationErrors,
  householdController.createHousehold
);

/**
 * @openapi
 * /households/addMembers:
 *  post:
 *   summary: Add members to a household
 *  description: Add members to a household.
 * requestBody:
 *  required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/AddMembers'
 * responses:
 * 201:
 * description: The added members.
 * 400:
 * description: Invalid request body.
 * 404:
 * description: Household not found.
 * 500:
 * description: Internal server error.
 */
router.post("/addMembers", householdController.addMembersToHousehold);

/**
 * @openapi
 * /households:
 *   get:
 *     summary: Retrieve all households
 *     description: Retrieve a list of all households.
 *     responses:
 *       200:
 *         description: A list of all households.
 *       500:
 *         description: Internal server error.
 */
router.get("/", householdController.getAllHouseholds);

/**
 *
 * @openapi
 * /households/{householdId}/tags:
 * post:
 * summary: Add tags to a household
 * description: Add tags to a household.
 * parameters:
 * - in: path
 *  name: householdId
 * required: true
 * schema:
 * type: string
 * description: ID of the household.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/AddTags'
 * responses:
 * 201:
 * description: The added tags.
 * 400:
 * description: Invalid request body.
 * 404:
 * description: Household not found.
 * 500:
 * description: Internal server error.
 *
 */
router.post("/:householdId/tags", householdController.addHouseholdTags);

/**
 * @openapi
 * /households/search:
 *  get:
 *  summary: Search households
 * description: Search households by name.
 * parameters:
 * - in: query
 * name: name
 * required: true
 * schema:
 * type: string
 * description: Name of the household to search for.
 * responses:
 * 200:
 * description: A list of households matching the search query.
 * 500:
 * description: Internal server error.
 * 404:
 * description: No households found.
 */
router.get("/search", householdController.searchHouseholds);

/**
 * @openapi
 * /households/{id}:
 *   get:
 *     summary: Retrieve a household by ID
 *     description: Retrieve a single household by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household to retrieve.
 *     responses:
 *       200:
 *         description: The requested household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", householdController.getHouseholdById);

/**
 * @openapi
 * /households/auth:
 *   get:
 *     summary: Retrieve a household by the authenticated session id
 *     description: Retrieve a single household by the authenticated session id.
 *     responses:
 *       200:
 *         description: The requested household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/auth/household", householdController.getHouseholdAuth);

/**
 * @openapi
 * /households/{id}:
 *   put:
 *     summary: Update a household
 *     description: Update an existing household.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Household'
 *     responses:
 *       200:
 *         description: The updated household.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateHousehold,
  handleValidationErrors,
  householdController.updateHousehold
);

/**
 * @openapi
 * /households/{id}:
 *   delete:
 *     summary: Delete a household
 *     description: Delete an existing household.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household to delete.
 *     responses:
 *       204:
 *         description: Household deleted successfully.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", householdController.deleteHousehold);

/**
 * @openapi
 * /households/{householdId}/users:
 *   get:
 *     summary: Get users of a household
 *     description: Retrieve a list of users belonging to a specific household.
 *     parameters:
 *       - in: path
 *         name: householdId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household.
 *     responses:
 *       200:
 *         description: A list of users belonging to the household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:householdId/users", householdController.getHouseholdUsers);

/**
 * @openapi
 * /households/{householdId}/lists:
 *   get:
 *     summary: Get lists associated with a household
 *     description: Retrieve a list of lists associated with a specific household.
 *     parameters:
 *       - in: path
 *         name: householdId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household.
 *     responses:
 *       200:
 *         description: A list of lists associated with the household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:householdId/lists", householdController.getHouseholdLists);

/**
 * @openapi
 * /households/{householdId}/expenses:
 *   get:
 *     summary: Get expenses associated with a household
 *     description: Retrieve a list of expenses associated with a specific household.
 *     parameters:
 *       - in: path
 *         name: householdId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household.
 *     responses:
 *       200:
 *         description: A list of expenses associated with the household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:householdId/expenses", householdController.getHouseholdExpenses);

/**
 * @openapi
 * /households/{householdId}/goals:
 *   get:
 *     summary: Get goals associated with a household
 *     description: Retrieve a list of goals associated with a specific household.
 *     parameters:
 *       - in: path
 *         name: householdId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household.
 *     responses:
 *       200:
 *         description: A list of goals associated with the household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:householdId/goals", householdController.getHouseholdGoals);

/**
 * @openapi
 * /households/{householdId}/tags:
 *   get:
 *     summary: Get tags associated with a household
 *     description: Retrieve a list of tags associated with a specific household.
 *     parameters:
 *       - in: path
 *         name: householdId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the household.
 *     responses:
 *       200:
 *         description: A list of tags associated with the household.
 *       404:
 *         description: Household not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:householdId/tags", householdController.getHouseholdTags);

/**
 * @openapi
 * /households/switch:
 *  post:
 *   summary: Switch the current household
 *   description: Switch the current household for the authenticated user.
 *   requestBody:
 *     required: true
 *   content:
 *     application/json:
 *   schema:
 *     $ref: '#/components/schemas/SwitchHousehold'
 *   responses:
 *     200:
 *       description: The switched household.
 *     400:
 *       description: Invalid request body.
 *     404:
 *       description: Household not found.
 *     500:
 *       description: Internal server error.
 */
router.post("/switch", householdController.switchHousehold);

/**
 * @openapi
 * /households/createRequest:
 * post:
 * summary: Create a request
 * description: Create a request for a household.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/CreateRequest'
 * responses:
 * 201:
 * description: The created request.
 * 400:
 * description: Invalid request body.
 * 500:
 * description: Internal server error.
 */
router.post("/createRequest", householdController.createRequest);

/**
 * @openapi
 * /households/updateRequestStatus:
 * post:
 * summary: Update a request status
 * description: Update a request status for a household.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UpdateRequestStatus'
 * responses:
 * 200:
 * description: The updated request status.
 * 400:
 * description: Invalid request body.
 * 404:
 * description: Request not found.
 * 500:
 * description: Internal server error.
 */
router.post("/updateRequestStatus", householdController.updateRequestStatus);

module.exports = router;
