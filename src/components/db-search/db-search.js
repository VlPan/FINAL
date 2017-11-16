import React from 'react';
import './db-search.scss';


export const SearchInput = (props) => {

    const filterItemsByTitle = (e) => {
        const title = e.target.value;
        props.filterItemsByTitle(title);
    };
        return (
            <div className="md-search">
                <div className="md-search__box">
                    <i className="fa fa-ravelry md-search__icon" aria-hidden="true"></i>
                </div>
                <input onKeyUp={filterItemsByTitle}
                       type="text" placeholder="Search"
                       className="md-search__input"
                       name="title"/>
            </div>
        );
};