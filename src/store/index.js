import {
  configureStore, //for configuring store
  createAsyncThunk, //for dispatching actions and creating them
  createSlice, //to create slices of store's data
} from "@reduxjs/toolkit";

import { TMBD_BASE_URL, API_KEY } from "../utils/constants";
import axios from "axios"; // for http requests to node.js and browser
import { async } from "@firebase/util";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  counter: 0,
}; //initial data in the store or the state of the app that needs to be used across the app

//Actions are used to communicate with the store
//In the store, we have action creators that are functions which create actions

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
}); //Action creator that will perform a get request to fetch all genres available through the API

// export const updateCounter = createAsyncThunk(
//   "netflix/counterupdate",
//   async (counter) => {
//     counter++;
//       console.log(counter);
//     return counter ;
//   }
// );

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];

    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    }); // match genre id with name, if genre name exists then push to genre array

    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      }); //if movie image exists then push movie to array
  });
}; //Parsing raw data from API

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
}; //get movies raw data into movies array

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();

    return getRawData(
      `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);//action creator for fetching movies from API

export const fetchMoviesByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre = 12, type }, thunkAPI) => {
    console.log(NetflixSlice.actions);
    const {
      netflix: { genres },
    } = thunkAPI.getState();

    return getRawData(
      `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
      true
    );
  }
);//action creator for fetching movies by genre from API

export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);//action creator for getting movies liked from mongoDB 

export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    console.log(movieId, email);

    const {
      data: { movies },
    } = await axios.put(`http://localhost:5000/api/user/remove`, {
      email,
      movieId,
    });
    return movies;
  }
);//action creator for deleting movies liked from mongoDB 

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    // builder.addCase(updateCounter.fulfilled, (state, action) => {
    //   state.counter = action.payload;
    // });
  }, //extraReducers are used to initiate actions that are defined outside or elsewhere
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
  
});//setup store

export const { setGenres, setMovies } = NetflixSlice.actions;
