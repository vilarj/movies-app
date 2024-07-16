"use client";

function MovieDetails({ movie }) {
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      {movie.director && <p>Director: {movie.director}</p>}
    </div>
  );
}

export default MovieDetails;
