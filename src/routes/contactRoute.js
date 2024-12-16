const express = require("express");
// const contact = require("../models/contact");
const Contact = require("../models/contact")
const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });
    const savedContact = await newContact.save();
    res.status(201).json({
      message: `Submitted! Thankyou for contacting Afritech Hub ${name}`,
      data: savedContact,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
