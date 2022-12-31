import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchMoviesByGenre } from "../store";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();

  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(fetchMoviesByGenre({genre: e.target.value, type })); //get movies by genre from redux store action 
      }}
    >
      { genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      )) //Display genres in drop down
      } 
    </Select>
  );
}

const Select = styled.select`
color: white;
background-color: rgba(0,0,0,0.4);
margin-left: 5rem;
cursor: pointer;
font-size: 1.4rem;
`;
