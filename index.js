const express = require("express");
const router = express.Router();
const port = 3000;
const server = express();

const Movie = require("./mongodb/models/movieModel");
const mongoConnect = require("./mongodb/mongodbConnection");

mongoConnect;

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/movies/title/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const movieByTitle = await Movie.find({ title });

    if (movieByTitle) {
      return res.status(200).json(movieByTitle);
    } else {
      return res.status(404).json("Sorry this movie was not found :(");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/movies/genre/:genre", async (req, res) => {
  const { genre } = req.params;

  try {
    const movieByGenre = await Movie.find({ genre });

    if (movieByGenre) {
      return res.status(200).json(movieByGenre);
    } else {
      return res.status(404).json("Sorry this movie was not found :(");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/movies/year/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });

    if (movieByYear) {
      return res.status(200).json(movieByYear);
    } else {
      return res
        .status(404)
        .json(`Sorry there is no movie with a year greater than ${year}`);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

server.use("/", router);

server.listen(port, () => {
  console.log(`Server running in http://127.0.0.1:${port}`);
});
