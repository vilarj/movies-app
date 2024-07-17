"use client";
import { useEffect, useState } from "react";
import Search from "./Components/Search";
import TrendingMovies from "./Components/TrendingMovies";
import { MOVIES_ENDPOINT } from "./Constants/Constants";

/**
 * Fetches movie data from the API.
 *
 * @returns A Promise that resolves to an array of
 * movie data, or rejects with an error.
 */
const fetchData = async () => {
  try {
    const response = await fetch(`${MOVIES_ENDPOINT}`);
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

/**
 * Represents the home page of the application.
 *
 * Displays a search component, fetches and displays a list
 * of movies, and handles loading and error states.
 */
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const movieData = await fetchData();
        setMovies(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movies.length) {
    return <p>No movies found.</p>;
  }

  const top20Movies = movies.slice(0, 20);

  return (
    <div>
      <div>
        <h1>Look up your favorite movie</h1>
      </div>
      <Search />
      <div>
        <TrendingMovies />
      </div>
      <div>
        <h1>Top 20 Movies of all time</h1>
        {top20Movies.map((movie) => (
          <p key={movie.title}>{movie.title}</p>
        ))}
      </div>
    </div>
  );
}
