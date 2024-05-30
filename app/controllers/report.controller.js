const { Report } = require("../models");
const { validationResult } = require("express-validator");
const jsend = require("jsend");

// Controller function to get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(jsend.success(reports));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to get a single report by ID
exports.getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(jsend.success(report));
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};

// Controller function to create a new report
exports.createReport = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(jsend.error(errors.message));
    }

    const { name, details } = req.body;
    const newReport = await Report.create({ name, details });
    res.status(201).json(jsend.success(newReport));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to update an existing report
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, details } = req.body;
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json(jsend.error("Report not found"));
    }
    await report.update({ name, details });
    res.status(200).json(jsend.success(report));
  } catch (error) {
    res.status(400).json(jsend.error(error.message));
  }
};

// Controller function to delete a report
exports.deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    await report.destroy();
    res.status(200).json(jsend.success());
  } catch (error) {
    res.status(500).json(jsend.error(error.message));
  }
};
