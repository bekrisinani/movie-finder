import React, {FC} from "react";
import styles from './Card.module.scss';
import {Movie} from "../../LandingPage";

interface ICardProps {
    data: Movie
    onClick: () => void;
}

const Card: FC<ICardProps> = ({data, onClick}) => {
    const {Title, Year, Poster} = data;
    return (
        <div className={styles["card"]} onClick={onClick}>
            <h4>{Title}</h4>
            <div className={styles["year"]}>{Year}</div>
            <img src={Poster}/>
        </div>
    );
};

export default Card;