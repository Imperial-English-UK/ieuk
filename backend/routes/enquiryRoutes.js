const express = require("express");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

// Create an enquiry
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  await Enquiry.create({ name, email, message });
  res.json({ message: "Enquiry submitted successfully" });
});

// Get all enquiries
router.get("/", async (req, res) => {
  const enquiries = await Enquiry.find();
  res.json(enquiries);
});

// Delete an enquiry
router.delete("/:id", async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ message: "Enquiry deleted successfully" });
});

module.exports = router;
