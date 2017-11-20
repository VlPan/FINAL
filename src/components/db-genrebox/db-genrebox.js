import React from 'react';
import './db-genrebox.scss';
import LS from './../../services/LS';
import chunk from 'chunk';

export const Genrebox = (props) => {
    console.log(props.genres);
    const genresFromServer = LS.get('genres');
    const chunkedGenres = chunk(genresFromServer, 4);
    return (
        <div className="md-genre-box" onClick={props.changeGenre}>
            {chunkedGenres.map((chunkedGenresArr, index) => {
                return (
                    <div className="md-genre-box__column" key={index} >
                        {chunkedGenresArr.map((genre, index) => {
                            return (
                                <div>
                                    <input key={index}
                                           type="checkbox"
                                           name="genre"
                                           value={genre.name}
                                           readOnly={props.genres && true}
                                           checked={
                                               props.genres &&
                                               props.genres.map((propsGenre) => {
                                                   return propsGenre.name === genre.name && true;
                                               }).includes(true)
                                           }/>
                                    <label>{genre.name}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
