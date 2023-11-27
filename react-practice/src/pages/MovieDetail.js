import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const id = useParams().id;
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState('');
  const getMovie = async (id) => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    setLoading(false);
    setMovie(json.data.movie);
  };
  console.log(movie);
  useEffect(() => {
    getMovie(id);
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <img src={movie.medium_cover_image} alt={movie.title} />
          </div>
          <h2>{movie.title}</h2>
          <p>rate : {movie.rating}</p>
        </div>
      )}
    </div>
  );
};
export default MovieDetail;
