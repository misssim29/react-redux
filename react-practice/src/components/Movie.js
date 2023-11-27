import { Link } from 'react-router-dom';

function Movie({ title, medium_cover_image, summary, genres, id }) {
  return (
    <div>
      <img src={medium_cover_image} alt={title} />
      <Link to={`/MovieDetail/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}
export default Movie;
