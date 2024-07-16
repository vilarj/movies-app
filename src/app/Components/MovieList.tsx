"use client";
import { useRouter } from "next/router"; // Use useRouter here for dynamic route parameters
import { useEffect } from "react";

function MovieList() {
  const router = useRouter();
  const { movieTitle } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/movies");
        console.log(response.status);
        if (!response.ok) {
          throw new Error(`Error fetching movies: ${response.statusText}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [movieTitle]);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
