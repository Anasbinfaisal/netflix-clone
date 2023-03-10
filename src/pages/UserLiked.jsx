import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { getUserLikedMovies } from "../store";
import { FirebaseAuth } from "../utils/Firebase";

export default function UserLiked() {
  const [isscrolled, setIsscrolled] = useState(false);

  const movies = useSelector((state) => state.netflix.movies);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
      } else if (!user) {
        navigate("/login");
      }
    });

    // unsubscribing from the listener when the component is unmounting.
    return unsubscribe;
  }, []);


  useEffect(() => {
    if (email) dispatch(getUserLikedMovies(email));
  }, [email]); //Dispatch function to get data from mongoDB

  window.onscroll = () => {
    setIsscrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <NavBar isScrolled={isscrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              /> // Diplay movies in cards without sliders
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;

    h1 {
      margin-left: 3rem;
    }

    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
