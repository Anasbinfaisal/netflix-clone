import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/home.jpg";
import styled from "styled-components";
import MovieLogo from "../assets/homeTitle.webp";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../utils/Firebase";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from "../store";
import Slider from "../components/Slider";

function Netflix() {
  const [isscrolled, setIsscrolled] = useState(false); //For setting the header background to dark on page scroll
  const movies = useSelector((state) => state.netflix.movies); //hook for redux state access
  // const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres()); //dispatch is used to trigger actions for state change in redux
  }, []);

  // var unsubscribe = FirebaseAuth.onAuthStateChanged((currentUser) => {
  //   if (currentUser) {
  //     dispatch(setisloggedin(true))
  //   } else {
  //     dispatch(setisloggedin(false))
  //   }
  // });
  // onAuthStateChanged(FirebaseAuth, (currentUser) => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  // });

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
        if (!user) {
            navigate("/login");
        }
    });
    
    // unsubscribing from the listener when the component is unmounting.
    return unsubscribe;
}, [])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/login");
  //   }
  // }, [loggedIn]);

  // var unsub =

  //current user is false then logout user to login screen

  // unsub();

  window.onscroll = () => {
    setIsscrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }; //Function to check if page is scrolled or not

  return (
    <Container>
      <NavBar isScrolled={isscrolled} />
      <div className="hero">
        <img
          className="background-image"
          src={backgroundImage}
          alt="backgroundImage "
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>

            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;
    .background-image {
      filter: brightness(70%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;

          &:hover {
            opacity: 0.8;
          }

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Netflix;
