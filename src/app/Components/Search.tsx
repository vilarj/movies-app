import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BY_TITLE_ENDPOINT,
  BY_TITLE_ENDPOINT_STRICT,
} from "../Constants/Constants";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("loose");
  const router = useRouter();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm) {
      return;
    }

    const url =
      searchType === "strict"
        ? `${BY_TITLE_ENDPOINT_STRICT}?title=${searchTerm}`
        : `${BY_TITLE_ENDPOINT}?title=${searchTerm}`;

    try {
      const response = await fetch(url);
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
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="loose">Loose Search</option>
          <option value="strict">Exact Search</option>
        </select>
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
          {searchResults.map((movie, index) => (
            <li key={movie.id || index}>
              {" "}
              <a onClick={() => router.push(`/movies/${movie.title}`)}>
                {movie.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
