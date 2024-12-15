const express = require("express");
const CourseRegistration = require("../models/course"); // Adjust path as needed
const router = express.Router();

// POST: Register a new course
router.post("/registerCourse", async (req, res) => {
    const { username, email, session, program } = req.body;
  try {
    // Check if the user has already registered for the same program (course)
    const existingCourse = await CourseRegistration.findOne({
      username: username,
      program: program,
    });
  
    if (existingCourse) {
      return res.status(400).json({ message: "You have already registered for this course!" });
    }

    // Create a new registration instance
    const newRegistration = new CourseRegistration({
      username,
      email,
      session,
      program,
    });

    // Save registration to the database
    const savedRegistration = await newRegistration.save();
    res.status(201).json({
      message: " Course registration is successful",
      data: savedRegistration,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Fetch all course registrations
router.get("/registrations", async (req, res) => {
  try {
    const registrations = await CourseRegistration.find();
    res.status(200).json({ data: registrations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch a single registration by ID
router.get("/registrations/:id", async (req, res) => {
  try {
    const registration = await CourseRegistration.findById(req.params.id);
    if (!registration)
      return res.status(404).json({ error: "Registration not found" });
    res.status(200).json({ data: registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a registration by ID
router.put("/registrations/:id", async (req, res) => {
  try {
    const { username, email, session, program } = req.body;
    const updatedRegistration = await CourseRegistration.findByIdAndUpdate(
      req.params.id,
      { username, email, session, program },
      { new: true, runValidators: true } // Return the updated document and validate fields
    );
    if (!updatedRegistration)
      return res.status(404).json({ error: "Registration not found" });
    res
      .status(200)
      .json({ message: "Registration updated", data: updatedRegistration });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Remove a registration by ID
router.delete("/registrations/:id", async (req, res) => {
  try {
    const deletedRegistration = await CourseRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRegistration)
      return res.status(404).json({ error: "Registration not found" });
    res.status(200).json({ message: "Registration deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
