import React from 'react';
import './db-nav.scss';



export const Navbar = (props) => {

    return (
        <div className="md-navbar md-navbar--left-margin">
            <ul className="md-navbar__container">
                {props.isFilmPage && <li className={['md-navbar__nav-item',
                    props.openAddMovieForm && 'md-navbar__nav-item--red-text'].join(' ')}
                                              onClick={props.handleOpenAddMovieForm}>Add movie</li>}
                <li className="md-navbar__nav-item">About</li>
                <li className="md-navbar__nav-item">Pricing</li>
                <li className="md-navbar__nav-item">Blog</li>
            </ul>
        </div>
    );
};
