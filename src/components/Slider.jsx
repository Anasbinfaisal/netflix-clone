import React from "react";
import CardSlider from "./CardSlider";

export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  }; //Slice movies from array for each slider

  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />

      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />

      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider title="Popuar on Netflix" data={getMoviesFromRange(30, 40)} />

      <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />

      <CardSlider title="Epic" data={getMoviesFromRange(50, 60)} />
    </div>
  );
}
