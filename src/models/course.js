const mongoose = require("mongoose");

const courseRegistrationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email format validation
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    session: {
      type: String,
      enum: ["Morning", "Afternoon"], // Only these two values are allowed
      required: true,
    },
    program: {
      type: String,
      enum: [
        "Basic Computing",
        "Cyber Security",
        "Web Development",
        "Data Analysis",
      ],
      required: true,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps
courseRegistrationSchema.index({ username: 1, program: 1 }, { unique: true });


module.exports = mongoose.model("CourseRegistration", courseRegistrationSchema);
