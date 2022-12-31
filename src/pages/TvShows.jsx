import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import { fetchMovies, getGenres, updateCounter } from '../store';
import { FirebaseAuth } from '../utils/Firebase';

export default function TvShows() {


  const [isscrolled, setIsscrolled] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(undefined);
  
    const movies = useSelector((state)=> state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  // const counter = useSelector((state) => state.netflix.counter);
  
    const navigate = useNavigate();
   const dispatch = useDispatch();
  
  
    useEffect(
      () => {
      dispatch(getGenres());
    }, []);
  
  
    useEffect(() => {
      if (genresLoaded) {
        dispatch(fetchMovies({type: "tv" }));
      }
    }, [genresLoaded]);
  
    useEffect(() => {
      const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
          if (!user) {
              navigate("/login");
          }
      });
      
      // unsubscribing from the listener when the component is unmounting.
      return unsubscribe;
  }, [])
  

  
    window.onscroll = () => {
      setIsscrolled(window.pageYOffset === 0  ? false : true);
      return ()=> (window.onscroll= null);
    };


  return (
      <Container>
          <div className='navbar'>
              <NavBar isScrolled={isscrolled} />
              
          </div>
         

          <div className='data'>
        <SelectGenre genres={genres} type="tv" />
        {/* <button onClick={()=> dispatch(updateCounter(counter))}>Update Counter</button> */}
              {
                  movies.length ? <Slider movies={movies}/> : <h1 className="not-available">
                  No TV Shows avaialble for the selected genre. Please select a
                  different genre.
                </h1>
              }
          </div>
    </Container>
  )
}

const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-available {
      text-align: center;
      margin-top: 4rem;
    }
    }
`;
