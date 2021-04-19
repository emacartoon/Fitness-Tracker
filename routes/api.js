const { Workout } = require("../models")
const router = require("express").Router();

//get all workouts and return them
// /api/workouts
router.get("/workouts", async function (req, res) {
  try {
    const data = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercise.duration",
          },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});


// /api/workouts post a new workout
router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
      .then((dbWorkout => {
          res.json(dbWorkout);
      })).catch(err => {
          res.json(err);
      })
});

// /api/workouts/:id Update a workout
router.put("/workouts/:id", async function (req, res) {
  try {
    const updateWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      // { new: true }
    );
    res.json(updateWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/workouts/range get a range
router.get("/workouts/range", async function (req, res) {
  try {
    const range = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercise.duration",
          },
        },
      },
    ])
      .sort({ day: -1 })
      .limit(7)
        res.json(range);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
