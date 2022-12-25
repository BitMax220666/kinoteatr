import "./App.css";
import Movie from "./components/Movie";
import { useState, useEffect } from "react";
import NotFaund from "./components/NotFaund";

const movieApi = "https://imdb-api.com/en/API/SearchMovie/k_3wz6b2cm/";
const movieTop = "https://imdb-api.com/en/API/Top250Movies/k_3wz6b2cm/";

function App() {
  const [movie, setMovie] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onHandleTerm = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.items);
        setLoading(false);
      });
  }, []);

  const onHandeleSearch = (e) => {
    e.preventDefault();
    fetch(movieApi + term)
      .then((res) => res.json())
      .then((res) => setMovie(res.results));
    setTerm("");
  };

  const onNotFaund = () => {
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => setMovie(res.items));
  };

  return (
    <>
      <header>
        <form action="submit" onSubmit={onHandeleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={term}
            onChange={onHandleTerm}
          />
        </form>
      </header>
      <div className="movies">
        {error ? (
          <NotFaund onNotFaund={onNotFaund} />
        ) : loading ? (
          "loading..."
        ) : (
          movie.map((elem) => <Movie key={elem.id} {...elem} />)
        )}
      </div>
    </>
  );
}

export default App;
