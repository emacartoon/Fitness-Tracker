const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "What type of exercise?",
      },
      name: {
        type: String,
        trim: true,
        required: "What did you do?",
      },
      duration: {
        type: Number,
        required: "How many minutes did you go?",
      },
      distance: {
        type: Number,
      },
      Weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;