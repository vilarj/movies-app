import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Renders a list of movies fetched from an API endpoint.

 * Displays a loading indicator while fetching data, an error message if fetching fails,
 * or a list of movie titles with links to individual movie pages.

 * @returns {JSX.Element} The rendered component.
 */
function MovieList() {
  const router = useRouter();
  const { movieTitle } = router.query;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches movie data from the API endpoint.
   *
   * @returns {Promise<any>} A Promise that resolves with the fetched movie data or rejects with an error.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/movies");
        if (!response.ok) {
          throw new Error(`Error fetching movies: ${response.statusText}`);
        }
        const data = await response.json();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {isLoading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <a onClick={() => router.push(`/movies/${movie.id}`)}>
                {movie.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
