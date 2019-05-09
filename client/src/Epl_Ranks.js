import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import './Epl_Ranks.css';

function Rank({title, poster, genres, synopsis}){
    return (
        <div className="Rank">
            <div className="Rank__Column">
                <RankPoster poster={poster} alt={title} />
            </div>   
            <div className="Rank__Column">
                <h1>{title}</h1>
                <div className="Rank__Genres">
                    {genres.map((genre, index) => <RankGenre genre={genre} key={index} />)}
                </div>
                <div className="Rank__Synopsis">
                <LinesEllipsis
                    text={synopsis}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    />   
                </div>
            </div>
        </div>
    )
}

function RankPoster({poster, alt}){
    return (
        <img src={poster} alt={alt} title={alt} className="Rank__Poster" />
    )
}

function RankGenre({genre}){
    return (
        <span className="Rank__Genre">{genre}</span>
    )
}

Rank.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired
}

RankPoster.propTypes = {
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

RankGenre.propTypes ={
    genre: PropTypes.string.isRequired
}

export default Rank