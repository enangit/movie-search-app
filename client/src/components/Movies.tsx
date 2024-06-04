import React, { useState } from 'react'
import movieImgPlaceholder from "../assets/placeholder.png";

type MoviesProps = {
    movies:
    [
        {
            Poster: string,
            Title: string,
            imdbID: string,
            Year: string
        }
    ],
    setMovies: React.Dispatch<React.SetStateAction<null>>,
    setMovie: React.Dispatch<React.SetStateAction<null>>,
}


const Movies: React.FunctionComponent<MoviesProps> = ({ movies, setMovies, setMovie }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    async function handleSeeDetails(title: string) {

        setIsLoading(true);
        try {

            const response = await fetch(`${import.meta.env.VITE_BASEURL}/search/movie/?title=${title}`);

            if (!response.ok) {
                throw new Error("Sorry error occured! Please try again.");
            }

            const data = await response.json();

            if (data.Response === "True") {
                setMovies(null);
                setMovie(data);
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
        <ul id="movies">
            {
                movies &&
                movies.length > 0 &&
                movies.map(movie => {
                    return (
                        <li key={movie.imdbID} className='movie'>
                            <div className="movie-img">
                                <img
                                    className='movie-image'
                                    src={movie.Poster !== "N/A" ? movie.Poster : movieImgPlaceholder}
                                    alt="movie image"
                                />
                            </div>
                            <div className="movie-info">
                                <h3 className='title'>{movie.Title}</h3>
                                <p className='year'> {movie.Year}</p>
                            </div>
                            <button
                                onClick={() => { handleSeeDetails(movie.Title) }}
                            >
                                See Movie Details
                            </button>
                        </li>)
                })
            }
            {
                error && <p> Sorry, there's an error loading movie details. </p>
            }
            {
                !error && isLoading && <p>Loading movie details...</p>
            }
        </ul>
    )
}

export default Movies
