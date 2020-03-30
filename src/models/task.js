const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },

    description: {
      type: String,
      maxlength: 255,
      required: true,
      trim: true
    },

    completed: {
      type: Boolean,
      default: false
    },

    img: {
      type: String
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
