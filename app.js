
// /api/workouts
router.get("/workouts", async function (req, res) {
    try {
      const data = await Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]);
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });