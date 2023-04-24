import React, {FC, useState} from 'react';
import styles from './LandingPage.module.scss';
import {TextInput} from "./custom-components/TextInput/TextInput";
import {RegisterButton} from "./custom-components/RegisterButton/RegisterButton";
import Card from "./custom-components/Card/Card";
import MovieModal from "./MovieModal/MovieModal";


export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}


const LandingPage: FC = () => {
    const [movieData, setMovieData] = useState<Movie[] | undefined>(undefined);
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined)
    const [movieDetails, setMovieDetails] = useState(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log({searchKeyword})


    const handleOnClick = async (keyword?: string) => {
        setMovieData(undefined)
        let totalPages = 1
        let allResults:Movie[] = []
        for (let i = 1; i <= totalPages; i++){
            const response = await fetch(`http://www.omdbapi.com/?apikey=1a32afb&s=${keyword}&type=movie&page=${i}`).then(res => {
                if (!res.ok) {
                    throw new Error('There was an error with the request');
                }
                return res.json();
            }).catch(err => {
                setMovieData(undefined)
                alert('There was an error with the request')
                throw new Error('There was an error with the request', err);
            });
            allResults = [...allResults, ...response.Search];
            if (response.totalResults){
                totalPages = response.totalResults / 10
            }
        }
        setMovieData(allResults)
    }

    const handleOnItemClick = async (row: Movie) => {
        setMovieDetails(undefined)
        console.log("item", row)
        const response = await fetch(`http://www.omdbapi.com/?apikey=1a32afb&i=${row.imdbID}`).then(res => {
            if (!res.ok) {
                throw new Error('There was an error with the request');
            }
            return res.json();
        }).catch(err => {
            alert('There was an error with the request')
            throw new Error('There was an error with the request', err);
        });

        setMovieDetails(response)

        setIsModalOpen(true)
    }
    return (
        <div className={styles['root']}>
            <div className={styles['header']}>
                <TextInput label={'Search for a movie'} onChange={key => {setSearchKeyword(key)}}/>
                <RegisterButton onClick={() => handleOnClick(searchKeyword)}/>
            </div>
            <div className={styles['cards']}>

                {movieData &&
                    movieData.map(movie => {
                        return <Card data={movie} onClick={() => handleOnItemClick(movie)}/>
                    })
                }
            </div>

            <MovieModal movie={movieDetails} isOpen={isModalOpen} onClose={() =>setIsModalOpen(false)}/>
        </div>
    );
}

export default LandingPage;
