import { useEffect, useState } from "react";
import { TRENDING_MOVIES } from "../Constants/Constants";

/**
 * Displays a list of trending movies based on the selected time window.

 * Fetches trending movies data from the API and displays them in a list.
 * Allows users to switch between displaying trending movies for the day or the week.
 *
 * @returns {JSX.Element} The rendered component.
 */
const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${TRENDING_MOVIES}?time_window=${timeWindow}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching trending movies: ${response.statusText}`
          );
        }
        const data = await response.json();
        setTrendingMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [timeWindow]);

  /**
   * Handles the change of the time window for fetching trending movies.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The change event from the select element.
   */
  const handleTimeWindowChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeWindow(event.target.value);
  };

  return (
    <div className="trending-movies">
      <h1>These are the trending movies</h1>
      <select value={timeWindow} onChange={handleTimeWindowChange}>
        <option value="day">Day</option>
        <option value="week">Week</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {trendingMovies.length > 0 && (
        <ul>
          {trendingMovies.map((movie) => (
            <li key={movie.id}>
              <a href={`/movies/${movie.id}`}>{movie.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingMovies;
