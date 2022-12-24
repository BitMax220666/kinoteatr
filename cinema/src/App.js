import "./App.css";
import Movie from "./components/Movie";
import { useState, useEffect } from "react";

const movieApi = 'https://imdb-api.com/en/API/SearchMovie/k_3wz6b2cm/';
const movieTop = 'https://imdb-api.com/en/API/Top250Movies/k_3wz6b2cm/';

function App() {
  const [movie, setMovie] = useState([]);
  const [term, setTerm] = useState('');

  const onHandleTerm = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    fetch(movieTop)
      .then(res => res.json())
      .then(res => setMovie(res.items));
  }, []);

  const onHandeleSearch = () => {
    fetch(movieApi)
      .then(res => res.json())
      .then(res => setMovie(res.results));
  }

  return (
    <>
      <header>
        <input
          type="text"
          placeholder="Search..."
          value={term}
          onChange={onHandleTerm}
        />
      </header>
      <div className="movies">
        {movie.map((elem) => (
          <Movie key={elem.id} {...elem} />
        ))}
      </div>
    </>
  );
}

export default App;
