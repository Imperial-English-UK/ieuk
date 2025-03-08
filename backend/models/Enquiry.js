const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
