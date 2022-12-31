import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import NavBar from "../components/NavBar";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";

import { fetchMovies, fetchMoviesByGenre, getGenres } from "../store";
import { FirebaseAuth } from "../utils/Firebase";

export default function Movies() {
  const [isscrolled, setIsscrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({type: "movie" }));
    }
  }, [genresLoaded]);

  // useEffect(() => {
  //   if (loggedIn !== undefined) {
  //     navigate("/login");
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
      if (!user) {
        navigate("/login");
      }
    });
    
    // unsubscribing from the listener when the component is unmounting.
    return unsubscribe;
  }, []);


  // onAuthStateChanged(FirebaseAuth, (currentUser) => {
  //   if (!currentUser) navigate("/login");
  // });
  //current user is false then logout user to login screen

  // FirebaseAuth.onAuthStateChanged((currentUser) => {
  //   if (currentUser) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // });

  // onAuthStateChanged(FirebaseAuth, (currentUser) => {
  //   if (!currentUser) navigate("/login");
  // });

  window.onscroll = () => {
    setIsscrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <NavBar isScrolled={isscrolled} />
      </div>

      <div className="data">
        <SelectGenre genres={genres} type="movie" />

        {movies.length //if movies array has data
          ? <Slider movies={movies} /> //show sliders for each movie list
          : <NotAvailable />
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
