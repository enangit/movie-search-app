import React from 'react';
import Icon from "@mui/material/Icon";
import movieImgPlaceholder from "../assets/placeholder.png";

type MovieProp = {
    movie: {
        Poster?: string
        Title?: string
        Genre?: string
        Plot?: string
        Actors?: string
        imdbRating?: string
        Director?: string
    }
    className?: string
}

const Movie: React.FunctionComponent<MovieProp> = ({ movie, ...rest }) => {

    return (
        <div id='movie' {...rest}>
            <div className="movie-img">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : movieImgPlaceholder}
                    alt="movie image" />
            </div>
            <div className="movie-info">
                <h3 className="title">{movie.Title}</h3>
                <p className="genre">{movie.Genre}</p>
                <p className="rating">
                    {movie.imdbRating}
                    <span>
                        <Icon>star</Icon>
                    </span>
                </p>

                <div className="actors">
                    <p>
                        <b>Summary:</b> {movie.Plot}
                    </p>
                    <p>
                        <b>Actors:</b> {movie.Actors}
                    </p>
                    <p>
                        <b>Director:</b> {movie.Director}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Movie;
