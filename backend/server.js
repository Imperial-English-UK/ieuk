const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Enquiry = mongoose.model("Enquiry", EnquirySchema);

app.post("/api/enquiry", async (req, res) => {
  const { name, email, message } = req.body;
  await Enquiry.create({ name, email, message });
  res.json({ message: "Enquiry submitted successfully" });
});

app.get("/api/enquiry", async (req, res) => {
  const enquiries = await Enquiry.find();
  res.json(enquiries);
});

app.delete("/api/enquiry/:id", async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ message: "Enquiry deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
