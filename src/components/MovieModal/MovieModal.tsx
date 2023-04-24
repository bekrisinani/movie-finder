import React, {FC} from "react";
import {Movie} from "./MovieModal.types";
import {CustomModal} from "../custom-components/Modal/Modal";
import styles from './MovieModal.module.scss';

export interface IMovieModalProps {
    movie?: Movie
    onClose?: () => void
    isOpen: boolean
}

const MovieModal: FC<IMovieModalProps> = ({ movie, onClose, isOpen }) => {

    console.log({movie})
    return (
        <CustomModal open={isOpen} handleClose={onClose} >
            <div className={styles['modal']}>
                <div className={styles['modal-content']}>
                    <div className={styles['header']}>
                        <div className={styles['title']}>{movie?.Title}</div>
                        <div className={styles['close-button']} onClick={onClose}>
                            X
                        </div>
                    </div>
                    <p>Year: {movie?.Year}</p>
                    <p>Rated: {movie?.Rated}</p>
                    <p>Released: {movie?.Released}</p>
                    <p>Runtime: {movie?.Runtime}</p>
                    <p>Genre: {movie?.Genre}</p>
                    <p>Director: {movie?.Director}</p>
                    <p>Writer: {movie?.Writer}</p>
                    <p>Actors: {movie?.Actors}</p>
                    <p>Plot: {movie?.Plot}</p>
                    <p>Language: {movie?.Language}</p>
                    <p>Country: {movie?.Country}</p>
                    <p>Awards: {movie?.Awards}</p>
                    <img src={movie?.Poster} alt={movie?.Title} />
                    {movie?.Ratings.map((rating, index) => (
                        <p key={index}>
                            {rating.Source}: {rating.Value}
                        </p>
                    ))}
                    <p>Metascore: {movie?.Metascore}</p>
                    <p>imdbRating: {movie?.imdbRating}</p>
                    <p>imdbVotes: {movie?.imdbVotes}</p>
                    <p>imdbID: {movie?.imdbID}</p>
                    <p>Type: {movie?.Type}</p>
                    <p>DVD: {movie?.DVD}</p>
                    <p>BoxOffice: {movie?.BoxOffice}</p>
                    <p>Production: {movie?.Production}</p>
                    <p>Website: {movie?.Website}</p>
                    <p>Response: {movie?.Response}</p>
                </div>
            </div>
        </CustomModal>

    );
};

export default MovieModal;
