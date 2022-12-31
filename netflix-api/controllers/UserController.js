const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body; //destructure items from request body
    const user = await User.findOne({ email }); //check if user exists in db

    if (user) {
      //if user exists check if movie exists
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id); //checking if movie exists

      if (!movieAlreadyLiked) {
        //if movie does not exist
        await User.findByIdAndUpdate(
          user._id,

          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likeMovies: [data] });
    return res.json({
      msg: "Movie added successfully",
    });
  } catch (error) {
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getlikedMovies = async (req, res) => {
  try {
    const { email } = req.params; //get email from request
    const user = await User.findOne({ email }); //check if user exists

    if (user) {
      res.json({ msg: "success", movies: user.likedMovies }); //submit response of likedmovies
    } else {
      return res.json({ msg: "User with given mail not found" });
    }
  } catch (error) {
    return res.json({ msg: "Error fetching movie" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId); //check if movie exists in db

      if (!movieIndex) {
        res.status(400).send({ msg: "Movie Not Found" });
      } //if movie not found
      movies.splice(movieIndex, 1); //if found, remove one iteam at index

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie Deleted", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    // return res.json({ msg: "Error removing movie to the liked list" });
  }
};
