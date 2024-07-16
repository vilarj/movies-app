import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieDetails from "../Components/MovieDetails";
import { BY_TITLE_ENDPOINT } from "../Constants/Constants";

export default function MoviePage() {
  const { movieTitle } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${BY_TITLE_ENDPOINT}?title=${movieTitle}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching movie: ${response.statusText}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    if (movieTitle) {
      fetchMovie();
    }
  }, [movieTitle]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return <MovieDetails movie={movie} />;
}
