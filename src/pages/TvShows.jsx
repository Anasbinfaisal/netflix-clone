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
import { fetchMovies, getGenres } from '../store';
import { FirebaseAuth } from '../utils/Firebase';

export default function TvShows() {


    const [isscrolled, setIsscrolled] = useState(false);
    const movies = useSelector((state)=> state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
  
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
  
  
  
    onAuthStateChanged(FirebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  
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
