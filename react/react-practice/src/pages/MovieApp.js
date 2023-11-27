import { useEffect, useState } from 'react';
import Movie from '../components/Movie.js';
const MovieApp = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`,
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        movies.map((item) => (
          <Movie
            medium_cover_image={item.medium_cover_image}
            title={item.title}
            summary={item.summary}
            genres={item.genres}
            key={item.id}
            id={item.id}
          />
        ))
      )}
    </div>
  );
};
export default MovieApp;
