"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BY_TITLE_ENDPOINT } from "../Constants/Constants";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm) {
      return;
    }

    try {
      const response = await fetch(`${BY_TITLE_ENDPOINT}?title=${searchTerm}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.error("Movie not found");
        } else {
          throw new Error(`Error fetching movies: ${response.statusText}`);
        }
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((movie) => (
            <li key={movie.title || movie.id}>
              <a onClick={() => router.push(`/movies/${movie.title}`)}>
                {movie.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
