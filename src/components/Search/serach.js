import React from 'react';
import './search.scss';


const SearchInput = (props) => {

    const filterFilmsByTitle = (e) => {
        const filmTitle = e.target.value;
        props.filterFilmsByTitle(filmTitle);
    };
        return (
            <div className="md-search">
                <div className="md-search__box">
                    <i className="fa fa-ravelry md-search__icon" aria-hidden="true"></i>
                </div>
                <input onKeyUp={filterFilmsByTitle}
                       type="text" placeholder="Search"
                       className="md-search__input"
                       name="title"/>
            </div>
        );
};






export default SearchInput;