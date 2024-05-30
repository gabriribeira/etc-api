const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller.js");
const {
  validateCreateReport,
  validateUpdateReport,
} = require("../validations/report.validation.js");
const { handleValidationErrors } = require("../middlewares/validation.js");

/**
 * @openapi
 * /reports:
 *   post:
 *     summary: Create a new report
 *     description: Create a new report.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: name of the report to create.
 *       - in: path
 *         name: details
 *         required: true
 *         description: details of the report to create.
 *     responses:
 *       201:
 *         description: The created report.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  validateCreateReport,
  handleValidationErrors,
  reportController.createReport
);

/**
 * @openapi
 * /reports:
 *   get:
 *     summary: Retrieve all reports
 *     description: Retrieve a list of all reports.
 *     responses:
 *       200:
 *         description: A list of all reports.
 *       500:
 *         description: Internal server error.
 */
router.get("/", reportController.getAllReports);

/**
 * @openapi
 * /reports/{id}:
 *   get:
 *     summary: Retrieve a report by ID
 *     description: Retrieve a single report by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the report to retrieve.
 *     responses:
 *       200:
 *         description: The requested report.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", reportController.getReportById);

/**
 * @openapi
 * /reports/{id}:
 *   put:
 *     summary: Update a report
 *     description: Update an existing report.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reports to update.
 *       - in: path
 *         name: name
 *         required: true
 *         description: name of the report to create.
 *       - in: path
 *         name: details
 *         required: true
 *         description: details of the report to create.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: The updated report.
 *       400:
 *         description: Invalid request body or ID.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  validateUpdateReport,
  handleValidationErrors,
  reportController.updateReport
);

/**
 * @openapi
 * /reports/{id}:
 *   delete:
 *     summary: Delete a report
 *     description: Delete an existing report.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the report to delete.
 *     responses:
 *       204:
 *         description: Report deleted successfully.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", reportController.deleteReport);

/**
 * @openapi
 * /reports/{reportId}/items:
 *   get:
 *     summary: Get items associated with a report
 *     description: Retrieve a list of items associated with a specific report.
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the report.
 *     responses:
 *       200:
 *         description: A list of items associated with the report.
 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:reportId/items", reportController.getReportItems);

module.exports = router;
