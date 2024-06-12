import './App.css';
import { Search } from '@mui/icons-material';
import { useState, useRef, FormEvent, useEffect } from "react";
import Movies from './components/Movies';
import Movie from "./components/Movie";

function App() {
    const [movie, setMovie] = useState<object | null>(null);
    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const searchWordRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (movies) {
            setMovie(null)
        }
    }, [movies]);

    const handleSearch = async (event: FormEvent) => {
        event.preventDefault();

        const query = searchWordRef?.current?.value;

        setIsLoading(true);

        try {

            if (!query) {
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BASEURL}/search/?title=${query}`);

            if (!response.ok) {
                throw new Error("Sorry error occured! Please try again.");
            }

            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);

            if (error instanceof Error) {
                setError(error);
            }
        }
    }

    return (
        <div>
            <header>
                <h1>Search The Movie You Like</h1>
            </header>
            <form method="get" onSubmit={handleSearch}>
                <div className="form-group">
                    <input type="text" name="query" ref={searchWordRef} />
                    <button type="submit" className='button'>
                        <Search className='search-icon' style={{ fontSize: "24px" }} />
                    </button>
                </div>
            </form>
            <main>
                {error && <h2>Sorry, there's an error! Please try again.</h2>}
                {!movie && !movies && !isLoading && <p> Search a movie... </p>}
                {isLoading ? <p>Loading ....</p> : null}
                {
                    movies &&
                    (<Movies
                        movies={movies}
                        setMovies={setMovies}
                        setMovie={setMovie}
                    />)
                }
                {
                    movie && <Movie className="individual-movie" movie={movie} ></Movie>
                }
            </main>
        </div >
    )
}

export default App
