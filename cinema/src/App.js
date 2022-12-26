import "./App.css";
import Movie from "./components/Movie";
import { useState, useEffect } from "react";
import NotFaund from "./components/NotFaund";
import { Spinner } from "react-bootstrap";

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
    setLoading(true);
    fetch(movieApi + term)
      .then((res) => res.json())
      .then((res) => {
        if (res.results.length !== 0) {
          setMovie(res.results);
        } else {
          setError(true);
        }

        setLoading(false);
      });
    setTerm("");
  };

  const onNotFaund = () => {
    setLoading(true);
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.items);
        setError(false);
        setLoading(false);
      });
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
          <Spinner
            animation="border"
            variant="light"
            style={{
              width: "5rem",
              height: "5rem",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        ) : (
          movie.map((elem) => <Movie key={elem.id} {...elem} />)
        )}
      </div>
    </>
  );
}

export default App;
