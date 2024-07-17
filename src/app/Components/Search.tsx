import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BY_TITLE_ENDPOINT,
  BY_TITLE_ENDPOINT_STRICT,
} from "../Constants/Constants";
/**
 * Search component for searching movies.
 *
 * Provides a form with search options and input field for users to
 * enter their search term. Fetches movie data based on the search
 * term and search type (loose or strict). Displays a list of search
 * results as movie titles with links to navigate to dedicated movie pages.
 */
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("loose");
  const router = useRouter();

  /**
   * Handles changes in the search term input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The change event from the input field.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handles form submission and fetches movie data based on search term and search type.
   *
   * @param {React.FormEvent<HTMLFormElement>} event The submit event from the search form.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <div className="search-parent">
      <div>
        <form className="inner-search-form" onSubmit={handleSubmit}>
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
      </div>
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
