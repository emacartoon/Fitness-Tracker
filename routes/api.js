const router = require("express").Router();
const db = require("../models");

//get all workouts and return them
// /api/workouts
router.get("/workouts", async function (req, res) {
  try {
    const workoutsAll = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercise.duration",
          },
        },
      },
    ]);
    res.json(workoutsAll);
  } catch (err) {
    res.status(500).send(err);
  }
});

// /api/workouts/:id
router.put("/workouts/:id", async function (req, res) {
  try {
    const updateWorkout = await Workout.findByIDAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      { new: true }
    );
    res.json(updateWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/workouts
router.post("/workouts", async function (req, res) {
  try {
    const addWorkout = await Workout.create({});
    res.json(addWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/workouts/range
router.get("/workouts/range", async function (req, res) {
  try {
    const range = await Workout.find({})
      .sort({ day: -1 })
      .limit(7)
      .then((range) => {
        res.json(range);
      });
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
